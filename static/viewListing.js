import axios from 'https://cdn.skypack.dev/axios'

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