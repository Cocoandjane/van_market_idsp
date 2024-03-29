import axios from 'https://cdn.skypack.dev/axios@v0.27.2'

class Carousel {
    constructor(element) {
        axios.get("/api/products")
            .then(response => {
                this.products = response.data.products
                // console.log(this.products)
                this.board = element
                // add first two cards programmatically
                this.push()
                this.push()
                // handle gestures
                this.handle()
            })
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
                threshold: 0 // connect my phone to swi
            }))

            // pass events data to custom callbacks
            this.hammer.on('pan', (e) => {
                this.onPan(e)
            })

            this.hammer.on('panend', (e) => {
                this.onPanend(e);
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

            // get top card bound
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


        let likeImg = this.topCard.querySelector('.likeImgHeart')
        let disLikeImg = this.topCard.querySelector('.dislikeImgHeart')
        // console.log('something is happening')
        if (dirX === -1) {
            disLikeImg.src = '/icons/broken_filled_heart.svg';
            likeImg.src = 'icons/Like.svg';
            // setTimeout(() => {
            //     disLikeImg.src = 'icons/Dislike.svg'
            // }, 500)
            // console.log('left', e.deltaX)
        } else if (dirX === 1) {
            likeImg.src = "/icons/filled_heart.svg";
            disLikeImg.src = 'icons/Dislike.svg';
            // setTimeout(() => {
            //     likeImg.src = 'icons/Like.svg'
            // }, 500)
            // console.log('right', e.deltaX)
        }

        // axios

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

                // Here you probably need to make a axios.post request to tell the server what happened
                // in the server make a post route to send the item to the wishlist
                const productId = this.topCard.id.replace("product-id-", "")

                if (dirX === -1) {
                    // console.log('went off screen to the left', productId)
                } else if (dirX === 1) {
                    // console.log('went off screen to the right', productId)
                }

                axios.post(('/likedItems'), { successful, productId, dirX })
                    .then((res) => {
                        // console.log('res', res)
                    })
                    .catch((err) => {
                        console.log('ERR', err)
                    })


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

    onPanend(e) {
        // console.log("bloblbo", e.deltaX)
        let likeImg = this.topCard.querySelector('.likeImgHeart')
        let disLikeImg = this.topCard.querySelector('.dislikeImgHeart')
        likeImg.src = 'icons/Like.svg';
        disLikeImg.src = 'icons/Dislike.svg';
    }

    push() {

        // we need to loop over the products here and for each product do all of the stuff under this line
        // need to change things down there like the src or the images, name of the seller and so on...

        this.products.forEach(product => {
            let card = document.createElement('div')
            card.setAttribute("id", `product-id-${product.post_id}`)
            card.classList.add('card')

            let productImageSection = document.createElement('section')
            // let productImage = document.createElement('img')
            // productImage.draggable = false;
            // productImage.classList.add('prdct-img')
            // productImageSection.classList.add('prdct-image')

            let productImageDiv = document.createElement('div')
            productImageDiv.classList.add('productImageDiv')
            // productImageDiv.append(productImage)
            productImageDiv.innerHTML = `<div draggable="false" class="prdct-img" style="background: url(${product.post_image}) center/cover no-repeat"></div>`
            productImageSection.addEventListener("click", evt => {
                let id = product.post_id;
                window.location = `/viewListing/${id}`
            })

            productImageSection.append(productImageDiv)
            // productImage.src = product.post_image
            let productDescriptionSection = document.createElement('section')
            let productName = document.createElement('h2')
            productName.textContent = product.title;
            let productPrice = document.createElement('h2')
            productPrice.textContent = "$" + product.price;
            productName.classList.add('prdct-name')
            productName.classList.add('prdct-price')
            productDescriptionSection.classList.add('prdct-name-price')
            productDescriptionSection.append(productName, productPrice)

            let sellerInfoSection = document.createElement('section')
            let sellerPfp = document.createElement('img')
            if (product.profile_img) {
                sellerPfp.src = product.profile_img;
            } else {
                sellerPfp.src = 'photos/smw.png';
            }
            sellerPfp.draggable = false;
            let productDescriptionDiv = document.createElement('div')
            let sellerName = document.createElement('h4')
            sellerName.classList.add('seller-name')
            sellerName.textContent = product["username"] // username on card

            let productDescription = document.createElement('p')
            productDescription.textContent = product.description
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

            let sellerid = product.user_id
            chatA.addEventListener("click", (event) => {
                event.preventDefault()
                // console.log(sellerId)
                axios.post("/sellerid", { sellerid })
                    .then(response => {
                        console.log(response)
                        let roomId = response.data.roomId;
                        console.log(roomId)
                        window.location = `/chat/${roomId}`;
                        // }

                    })
            })


            let likeA = document.createElement('a')
            dislikeA.href = ""
            chatA.href = ""
            likeA.href = ""
            let disLikeImg = document.createElement('img')
            disLikeImg.classList.add('dislikeImgHeart')
            disLikeImg.addEventListener("click", function (e) {
                e.preventDefault()
                // disLikeImg.src = 'icons/broken_filled_heart.svg';
            })
            let chatImg = document.createElement('img')
            let likeImg = document.createElement('img')
            likeImg.classList.add('likeImgHeart')


            likeA.addEventListener("click", function (e) {
                e.preventDefault()
            })





            disLikeImg.src = 'icons/Dislike.svg';
            chatImg.src = 'icons/Chat.svg';
            likeImg.src = 'icons/Like.svg';

            dislikeA.append(disLikeImg)
            chatA.append(chatImg)
            likeA.append(likeImg)


            // 
            decisionSection.append(dislikeA, chatA, likeA)
            card.append(productImageSection, productDescriptionSection, sellerInfoSection, decisionSection)

            this.board.insertBefore(card, this.board.firstChild)
        })
        // card.style.backgroundImage =
        //     "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')"
    }
}

let board = document.querySelector('#board')
let carousel = new Carousel(board)


let likedItems = document.querySelector('.wished')
likedItems.addEventListener('click', (event) => {
    location.href = '/likedItems'
    event.preventDefault()
})
