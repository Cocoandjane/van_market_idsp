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
let createBtn = document.querySelector("#create")

createBtn.addEventListener("click", event => {
    event.preventDefault()

    let title = document.querySelector(".title").value
    let price = document.querySelector(".price").value
    let condition = document.querySelector("#condition").value
    let description = document.querySelector(".description").value
    //location


    console.log(title, price, condition, description)
 
 axios.post("/createListing", {title, price, condition, description})
   // axios.post("/createListing", {})
    .then(response => {
        console.log(response)
        location.href = '/'
    })
    .catch(() => {

    })
    
})

