//write your swipe javascript code here
class Carousel {

    constructor(element) {

        this.board = element

        // add first two cards programmatically
        this.push()
        this.push()

        // handle gestures
        this.handle()

    }

    handle() {

        // list all cards
        this.cards = this.board.querySelectorAll('.card')

        // get top card
        this.topCard = this.cards[this.cards.length - 1]

        // get next card
        this.nextCard = this.cards[this.cards.length - 2]

        // if at least one card is present
        if (this.cards.length > 0) {

            // set default top card position and scale
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

            // destroy previous Hammer instance, if present
            if (this.hammer) {
                this.hammer.destroy()
            }
            // listen for tap and pan gestures on top card
            this.hammer = new Hammer(this.topCard)
            this.hammer.add(new Hammer.Pan({
                position: Hammer.position_ALL,
                threshold: 0.1
            }))

            // pass events data to custom callbacks
            this.hammer.on('pan', (e) => {
                this.onPan(e)
            })

        }

    }

    onPan(e) {

        if (!this.isPanning) {

            this.isPanning = true

            // remove transition properties
            this.topCard.style.transition = null
            if (this.nextCard) this.nextCard.style.transition = null

            // get top card coordinates in pixels
            let style = window.getComputedStyle(this.topCard)
            // console.log(style)
            let mx = style.transform.match(/^matrix\((.+)\)$/)
            // console.log('mx: ', mx)
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

            // get top card bounds
            let bounds = this.topCard.getBoundingClientRect()

            // get finger position on top card, top (1) or bottom (-1)
            this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

        }

        // get new coordinates
        let posX = e.deltaX + this.startPosX
        let posY = e.deltaY + this.startPosY
        // console.log('posX: ', posX, 'posY: ', posY)

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / this.board.clientWidth
        let propY = e.deltaY / this.board.clientHeight
        // console.log('propX: ', propX, 'propY: ', propY)
        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1 // deltaX makes this possible, 
        if (dirX === -1) {
            console.log('left')
        } else if (dirX === 1) {
            console.log('right')
        }

        // get degrees of rotation, between 0 and +/- 45
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 40
        // console.log('deg: ', deg)

        // get scale ratio, between .95 and 1
        let scale = (95 + (5 * Math.abs(propX))) / 100

        // move and rotate top card
        this.topCard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)'

        // scale up next card
        if (this.nextCard) this.nextCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'

        if (e.isFinal) {

            this.isPanning = false
            let successful = false

            // set back transition properties
            this.topCard.style.transition = 'transform 200ms ease-out'
            if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear'

            // check threshold and movement direction
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {

                successful = true
                // get right border position
                posX = this.board.clientWidth

            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {

                successful = true
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth)
            }

            if (successful) {

                // throw card in the chosen direction
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                // wait transition end
                setTimeout(() => {
                    // remove swiped card
                    this.board.removeChild(this.topCard)
                    // add new card
                    this.push()
                    // handle gestures on new top card
                    this.handle()
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

        // prdct-image > img // 
        // prdct-name-price > h2 h2 //
        // seller-prdct-info > img & div > h4 p
        // decision > a img X3

        let card = document.createElement('div')
        card.classList.add('card')

        let productImageSection = document.createElement('section')
        let productImage = document.createElement('img')
        productImage.classList.add('prdct-img')
        productImageSection.classList.add('prdct-image')
        productImageSection.append(productImage)
        productImage.src = 'photos/Screen Shot 2022-04-27 at 4.05.01 PM.png';
        let productDescriptionSecion = document.createElement('section')
        let productName = document.createElement('h2')
        productName.textContent = 'MacBook Pro'
        let productPrice = document.createElement('h2')
        productPrice.textContent = '$2094'
        productName.classList.add('prdct-name')
        productName.classList.add('prdct-price')
        productDescriptionSecion.classList.add('prdct-name-price')
        productDescriptionSecion.append(productName, productPrice)

        let sellerInfoSection = document.createElement('section')
        let sellerPfp = document.createElement('img')
        sellerPfp.src = 'photos/smw.png';
        let productDescriptionDiv = document.createElement('div')
        let sellerName = document.createElement('h4')
        sellerName.classList.add('seller-name')
        sellerName.textContent = 'Murad Qumizakis'
        let productDescription = document.createElement('p')
        productDescription.textContent = 'New Macbook Pro, great condition. Looking to upgrade! HMU for offers :-)'
        productDescription.classList.add('prdct-desc')
        sellerName.classList.add('seller-name')
        productDescriptionDiv.classList.add('prdct-div')
        sellerPfp.classList.add('pfp-img')
        sellerInfoSection.classList.add('seller-prdct-info')

        productDescriptionDiv.append(sellerName, productDescription)

        sellerInfoSection.append(sellerPfp, productDescriptionDiv)

        let decisionSection = document.createElement('section')
        decisionSection.classList.add('decision')

        let dislikeA = document.createElement('a')
        let chatA = document.createElement('a')
        let likeA = document.createElement('a')
        let disLikeImg = document.createElement('img')
        let chatImg = document.createElement('img')
        let likeImg = document.createElement('img')

        disLikeImg.src = 'icons/Dislike.svg';
        chatImg.src = 'icons/Chat.svg';
        likeImg.src = 'icons/Like.svg';

        dislikeA.append(disLikeImg)
        chatA.append(chatImg)
        likeA.append(likeImg)

        decisionSection.append(dislikeA, chatA, likeA)

        card.append(productImageSection, productDescriptionSecion, productDescriptionSecion, sellerInfoSection, decisionSection)
        // card.style.backgroundImage =
        //     "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')"

        this.board.insertBefore(card, this.board.firstChild)

    }

}

let board = document.querySelector('#board')
let carousel = new Carousel(board)