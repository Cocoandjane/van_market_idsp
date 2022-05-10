import axios from 'https://cdn.skypack.dev/axios'

function createCard() {
    let card = document.createElement("div");
    card.innerHTML = `
    <strong>Confirm Delete?</strong>
    <p>this can not be undone</p>
    <button class="no">No</button>
    <button class="yes">COMFIRM DELETE</button>
    `
    card.classList.add("card")
    return card;
}

axios.get("/viewListing/:id")
.then(res => {
    console.log(res.data)
})

let deleteBtn = document.querySelector("a.delete")
deleteBtn.addEventListener("click", (event) => {
    let deleteCard = createCard();
    let section = document.querySelector(".delete-sec")
    section.appendChild(deleteCard)
    event.preventDefault();
    let no = document.querySelector("button.no");
    no.addEventListener("click", (event) => {
        let card = document.querySelector(".card")
        console.log(card)
        card.classList.add("disapear")
    })
    
    let yes = document.querySelector("button.yes");
    yes.addEventListener("click", (event)=>{
        window.location="deletePost?/id=<%=p.id%>"
    })
    
})

