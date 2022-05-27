let people = document.querySelectorAll(".all")
people.forEach(p => {
    p.addEventListener("click", (event) => {
        console.log("click")
        event.preventDefault()
        let id =p.dataset.id
        window.location = `/chat/${id}`
    })
})

let recentMsg = document.querySelectorAll(".recentMsg")
for (let i = 0; i < recentMsg.length; i++) {
let roomIds = recentMsg[i].dataset.id
for (let roomId of roomIds) {
let chatHistery = JSON.parse(localStorage.getItem(roomId))
recentMsg[i].innerHTML = chatHistery[chatHistery.length-1].text
}
}

let recentTime = document.querySelectorAll(".time")
for (let i = 0; i < recentTime.length; i++) {
    let roomIds = recentTime[i].dataset.id
    for (let roomId of roomIds) {
    let chatHistery = JSON.parse(localStorage.getItem(roomId))
    recentTime[i].innerHTML = chatHistery[chatHistery.length-1].time
    }
}





