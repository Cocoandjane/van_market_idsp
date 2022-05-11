import axios from 'https://cdn.skypack.dev/axios'

// function createCard() {
//     let card = document.createElement("div");
//     card.innerHTML = `
//     <strong>Confirm Delete?</strong>
//     <p>this can not be undone</p>
//     <button class="no">No</button>
//     <button class="yes">COMFIRM DELETE</button>
//     `
//     card.classList.add("card")
//     return card;
// }

let idkSomeArray = location.href.split("/")
let postId = idkSomeArray[idkSomeArray.length-1]
axios.get(`/viewListing/${postId}`)
.then(res => {
    console.log(res.data)
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
    event.stopPropagation();
})

let no = document.querySelector("button.no");
no.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.add("displayNone")
    event.preventDefault();
})