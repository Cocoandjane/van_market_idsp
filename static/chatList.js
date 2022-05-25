

let chats = document.querySelectorAll(".chatPerson")

chats.forEach(chat =>{
    chat.addEventListener("click", (event) => {
        event.preventDefault()
        let id =chat.dataset.id
        window.location=`/chat/${id}`
    })
})