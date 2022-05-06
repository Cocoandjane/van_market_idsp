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
import axios from 'https://cdn.skypack.dev/axios'

// let addNewPost = document.querySelector(".postNew")
// addNewPost.addEventListener("click", function (event) {
//     let catagorySlide = document.querySelector("div.createNew.displayNone")
//     catagorySlide.classList.remove("displayNone")
//     event.preventDefault()
// })


// let main = document.querySelector("main")
// main.addEventListener("click", function (event) {
//     let catagorySlide = document.querySelector("div.createNew")
//     catagorySlide.classList.add("displayNone")
//     event.preventDefault()
// })

// console.log(title)
// let createBtn = document.querySelector("#create")

// createBtn.addEventListener("click", event => {
//     event.preventDefault()

//     let title = document.querySelector(".title").value
//     let price = document.querySelector(".price").value
//     let condition = document.querySelector("#condition").value
//     let description = document.querySelector(".description").value
//     //location

let addPostOther = document.querySelector('.catagories.other')
addPostOther.addEventListener('click', () => {
    location.href = '/createListing'
})

let likedItems = document.querySelector('.idkwtf')
likedItems.addEventListener('click', () => {
    location.href = '/likedItems'
})
//     console.log(title, price, condition, description)

//  axios.post("/createListing", {title, price, condition, description})
//    // axios.post("/createListing", {})
//     .then(response => {
//         console.log(response)
//         location.href = '/'
//     })
//     .catch(() => {

//     })

// })


//handling s3 images
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = imageInput.files[0]

    //get secure url form our server
    const { url } = await fetch("/s3Url").then(res => res.json())
    console.log(url)
    // post the image directly to the s3 bucket

    await fetch(url, {
        method: "PUT",
        headers: {
            "Conten_Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)

    let title = document.querySelector(".title").value
    let price = document.querySelector(".price").value
    let condition = document.querySelector("#condition").value
    let description = document.querySelector(".description").value
    //location
    //console.log(title, price, condition, description)
    axios.post("/createListing", { title, price, condition, description, imageUrl })
        // axios.post("/createListing", {})
        .then(response => {
            console.log(response)
            location.href = '/'
        })
        .catch(() => {

        })


    // post requet to my server with the iamgeUrl
    // title
    // price
    // description
    // condition
    // location

    // const img = document.createElement("img")
    // img.src = imageUrl
    // document.body.appendChild(img)
})


