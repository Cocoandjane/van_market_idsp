

let chats = document.querySelectorAll(".chatPerson")

let recentMsg = document.querySelectorAll(".recentMsg")
recentMsg.forEach(n => {
    let roomIds = n.dataset.id
    for (let roomId of roomIds) {
        let chatHistery = JSON.parse(localStorage.getItem(roomId))
        n.innerHTML = chatHistery[chatHistery.length - 1].text
    }
})


let recentTime = document.querySelectorAll(".time")
recentTime.forEach(n => {
    let roomIds = n.dataset.id
    for (let roomId of roomIds) {
        let chatHistery = JSON.parse(localStorage.getItem(roomId))
        n.innerHTML = chatHistery[chatHistery.length - 1].time
    }
})
// recentTime.innerHTML = chatHistery[chatHistery.length - 1].time

let people = document.querySelectorAll(".all")
people.forEach(p => {
    let roomId = p.dataset.id
    p.addEventListener("click", (event) => {
        event.preventDefault()
        // let id =chat.dataset.id
        window.location = `/chat/${roomId}`
    })
})


// console.log(localStorage.getItem(1))