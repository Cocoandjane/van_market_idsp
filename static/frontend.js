let addNewPost = document.querySelector(".postNew")
addNewPost.addEventListener("click", function (event) {
    let catagorySlide = document.querySelector("div.createNew.displayNone")
    catagorySlide.classList.remove("displayNone")
    event.preventDefault()
})

let main = document.querySelector("main")
main.addEventListener("click", function (event) {
    let catagorySlide = document.querySelector("div.createNew")
    catagorySlide.classList.add("displayNone")
    event.preventDefault()
})

let addPostElectronics = document.querySelector('.catagories.electronics')
addPostElectronics.addEventListener('click', () => {
    location.href = '/createListing'
})

let addPostClothes = document.querySelector('.catagories.clothes')
addPostClothes.addEventListener('click', () => {
    location.href = '/createListing'
})

let addPostFurniture = document.querySelector('.catagories.furniture')
addPostFurniture.addEventListener('click', () => {
    location.href = '/createListing'
})


let addPostOther = document.querySelector('.catagories.other')
addPostOther.addEventListener('click', () => {
    location.href = '/createListing'
})

let likedItems = document.querySelector('.idkwtf')
likedItems.addEventListener('click', () => {
    location.href = '/likedItems'
})

