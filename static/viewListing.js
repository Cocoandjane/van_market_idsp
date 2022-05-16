
let editBtn = document.querySelector("a.edit") 
if(editBtn){
editBtn.addEventListener("click", (event) => {
    let editPage = editBtn.href
    window.location = editPage
})
}

let deleteBtn = document.querySelector("a.delete")
if(deleteBtn){
deleteBtn.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.remove("displayNone");
})}

let yes = document.querySelector("button.yes");
yes.addEventListener("click", (event) => {
//     let x = yes.action
//    // window.alert("product deleted")
//     window.location = x
})

let no = document.querySelector("button.no");
no.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.add("displayNone")
    event.preventDefault();
})