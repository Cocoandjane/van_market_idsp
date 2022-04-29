// import db from '../mockDatabase'
let dirX;
class Carousel {


    constructor(element) {

        this.products = [
            {
                "id": 1,
                "seller-name": "Michael Jackson",
                "title": "White T-Shirt",
                "price": "$19.99",
                "description": "good looking white t-shirt, want it or not",
                "img": "https://cdn.pixabay.com/photo/2017/01/13/04/56/blank-1976334_1280.png"
            },
            {
                "id": 2,
                "seller-name": "Oliver Nguyen",
                "title": "Cool Grey Pants",
                "price": "$19.99",
                "description": "good looking black pants, want it or not",
                "img": "https://media.istockphoto.com/photos/modern-womens-business-suit-picture-id1332743987?b=1&k=20&m=1332743987&s=170667a&w=0&h=Qem1BVt_P2Cy8pS87gMuFiL1x4qE4INHRg0cHp6le-o="
            },
            {
                "id": 3,
                "seller-name": "Sejin Oh",
                "title": "Shoes",
                "price": "$19.99",
                "description": "good looking white shoes, want it or not",
                "img": "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619__340.jpg"
            },


            {
                "id": 4,
                "seller-name": "Suji Oh",
                "title": "Macbook Pro",
                "price": "$1299.09",
                "description": "I am a reasonable price, get me?",
                "img": "https://cdn.pixabay.com/photo/2015/11/19/11/45/macbook-pro-1050973__340.jpg"
            },
            {
                "id": 5,
                "seller-name": "Jeremy Hole-man",
                "title": "Headphones",
                "price": "$399.99",
                "description": "I am a bit expensive, but you decide i am worth it or not",
                "img": "https://media.istockphoto.com/photos/modern-professional-headphones-isolated-on-wooden-table-picture-id1222428599?b=1&k=20&m=1222428599&s=170667a&w=0&h=qiKLnklZvi3lZ9WXYkELOmxtN4hE9jxerBukAesJ2ms="
            },
            {
                "id": 6,
                "seller-name": "Sam Meech-Ward",
                "title": "Nikon Camera",
                "price": "$50",
                "description": "seconde hand camera, old school, you deserve me",
                "img": "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731__480.jpg"
            }
        ]

        this.likedItems = [];


        this.board = element;


        // add first two cards programmatically
        this.push();
        this.push();

        // handle gestures
        this.handle();

    }

    handle() {

        // list all cards
        this.cards = this.board.querySelectorAll('.card');

        // get top card
        this.topCard = this.cards[this.cards.length - 1];

        // get next card
        this.nextCard = this.cards[this.cards.length - 2];

        // if at least one card is present
        if (this.cards.length > 0) {

            // set default top card position and scale
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

            // destroy previous Hammer instance, if present
            if (this.hammer) {
                this.hammer.destroy();
            };
            // listen for tap and pan gestures on top card
            this.hammer = new Hammer(this.topCard);
            this.hammer.add(new Hammer.Pan({
                position: Hammer.position_ALL,
                threshold: 0.1
            }));

            // pass events data to custom callbacks
            this.hammer.on('pan', (e) => {
                this.onPan(e);
            });

        }

    }

    onPan(e) {

        if (!this.isPanning) {

            this.isPanning = true;

            // remove transition properties
            this.topCard.style.transition = null;
            if (this.nextCard) this.nextCard.style.transition = null;

            // get top card coordinates in pixels
            let style = window.getComputedStyle(this.topCard);
            // console.log(style)
            let mx = style.transform.match(/^matrix\((.+)\)$/);
            // console.log('mx: ', mx)
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

            // get top card bounds
            let bounds = this.topCard.getBoundingClientRect();

            // get finger position on top card, top (1) or bottom (-1)
            this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

        };

        // get new coordinates
        let posX = e.deltaX + this.startPosX;
        let posY = e.deltaY + this.startPosY;


        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / this.board.clientWidth;
        let propY = e.deltaY / this.board.clientHeight;

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1;

        // let cards = document.querySelectorAll('.card')
        // for (let i = 0; i < cards.length; i++) {
        //     const element = cards[i];
        // } 

        if (e.isFinal && dirX === -1) {
            console.log('left');
        } else if (dirX === 1) {
            console.log('right');
        }

        // get degrees of rotation, between 0 and +/- 45
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 40;
        // console.log('deg: ', deg)

        // get scale ratio, between .95 and 1
        let scale = (95 + (5 * Math.abs(propX))) / 100;

        // move and rotate top card
        this.topCard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)'

        // scale up next card
        if (this.nextCard) this.nextCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'

        if (e.isFinal) {

            this.isPanning = false;
            let successful = false;

            // set back transition properties
            this.topCard.style.transition = 'transform 200ms ease-out';
            if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear';

            // check threshold and movement direction
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {

                successful = true;
                // get right border position
                posX = this.board.clientWidth;

            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {

                successful = true;
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth);
            };

            if (successful) {

                // throw card in the chosen direction
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                // wait transition end
                setTimeout(() => {
                    // remove swiped card
                    this.board.removeChild(this.topCard);
                    // add new card
                    this.push();
                    // handle gestures on new top card
                    this.handle();
                }, 200)

            } else {

                // reset cards position and size
                this.topCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
                if (this.nextCard) this.nextCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)'

            }

        }

    }

    push() {

        // we need to loop over the products here and for each product do all of the stuff under this line
        // need to change things down there like the src or the images, name of the seller and so on...

        this.products.forEach(product => {

            let card = document.createElement('div')
            let productImageSection = document.createElement('section')
            let productImage = document.createElement('img')
            let dislikeA = document.createElement('a')
            let chatA = document.createElement('a')
            let likeA = document.createElement('a')
            let disLikeImg = document.createElement('img')
            let chatImg = document.createElement('img')
            let likeImg = document.createElement('img')
            let productDescriptionSection = document.createElement('section')
            let productName = document.createElement('h2')
            let productPrice = document.createElement('h2')
            let sellerInfoSection = document.createElement('section')
            let sellerPfp = document.createElement('img')
            let productDescriptionDiv = document.createElement('div')
            let sellerName = document.createElement('h4')
            let productDescription = document.createElement('p')
            let decisionSection = document.createElement('section')

            productPrice.textContent = product.price
            productImage.src = product.img
            productName.textContent = product.title;
            productDescription.textContent = product.description
            sellerPfp.src = 'photos/smw.png';

            disLikeImg.src = 'icons/Dislike.svg'; // Static
            chatImg.src = 'icons/Chat.svg';       // Static
            likeImg.src = 'icons/Like.svg';       // Static

            card.classList.add('card')
            productImage.classList.add('prdct-img')
            productImageSection.classList.add('prdct-image')
            productName.classList.add('prdct-name')
            productName.classList.add('prdct-price')
            productDescriptionSection.classList.add('prdct-name-price')
            sellerName.classList.add('seller-name')
            sellerName.textContent = product["seller-name"]
            productDescription.classList.add('prdct-desc')
            sellerName.classList.add('seller-name')
            productDescriptionDiv.classList.add('prdct-div')
            sellerPfp.classList.add('pfp-img')
            sellerInfoSection.classList.add('seller-prdct-info')
            decisionSection.classList.add('decision')

            productDescriptionSection.append(productName, productPrice)
            productImageSection.append(productImage)
            productDescriptionDiv.append(sellerName, productDescription)
            sellerInfoSection.append(sellerPfp, productDescriptionDiv)
            dislikeA.append(disLikeImg)
            chatA.append(chatImg)
            likeA.append(likeImg)

            decisionSection.append(dislikeA, chatA, likeA)
            card.append(productImageSection, productDescriptionSection, sellerInfoSection, decisionSection)
            // should i save the state of which card the user got too on localStorage?

            this.board.insertBefore(card, this.board.firstChild)
            if (dirX === 1) {
                this.likedItems.push(product)
                console.log(this.likedItems) // could we maybe pass this into a callback function and use it where dirX is defined and do this logic there?
            }
        })
    }
}

let board = document.querySelector('#board')
let carousel = new Carousel(board)