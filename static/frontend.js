


let addNewPost = document.querySelector(".postNew")
addNewPost.addEventListener("click", function (event) {
    let catagorySlide = document.querySelector("div.createNew.displayNone")
    catagorySlide.classList.remove("displayNone")
    event.preventDefault()
})

let main = document.querySelector("main")
// console.log(main)
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



// let viewProductButton = document.querySelector(`.card`); // change this to be the .viewProductButton
// viewProductButton.addEventListener('click', (e) => {
//     let cardWithId = e.target.closest("div").id.split("-")[2]
//     console.log(cardWithId)
//     location.href = `/viewListing/${cardWithId}`
// })


let createBtn = document.querySelector("#create")

// if the button still does not work after asking sam, than target the class that the button class and yeah....

