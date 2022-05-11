import axios from 'https://cdn.skypack.dev/axios'

let idkSomeArray = location.href.split("/")
let postId = idkSomeArray[idkSomeArray.length-1]
axios.get(`/viewListing/${postId}`)
.then(res => {
    //console.log(res.data)
})

let editBtn = document.querySelector("a.edit") 
editBtn.addEventListener("click", (event) => {
    let editPage = editBtn.href
    window.location = editPage
})

let deleteBtn = document.querySelector("a.delete")
deleteBtn.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.remove("displayNone");
})

let yes = document.querySelector("button.yes");
yes.addEventListener("click", (event) => {
    let x = yes.action
    window.alert("product deleted")
    window.location = x
})

let no = document.querySelector("button.no");
no.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.add("displayNone")
    event.preventDefault();
})