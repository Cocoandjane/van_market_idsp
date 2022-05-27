

import axios from 'https://cdn.skypack.dev/axios'

const socket = io();

const joinRoomButton = document.getElementById
    ("room-button")
const messageInput = document.getElementById
    ("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")


// socket.on('connect', () => {
//     // displayMessage(`you connected with id: ${socket.id}`)
// })

let roomId = document.getElementById("message-container").dataset.room
let myName = document.getElementById("message-container").dataset.name;


axios.post("/messages", {roomId})
.then(response => {
    console.log(response.data)
    let allHistory = response.data
    allHistory.forEach(message => {
        let userId = +document.querySelector("hr").dataset.id;
        console.log(userId)
        if (message.user_id === userId) {
            displayMessageSend(message.message, message.sent_datetime.split(",")[2])
        } else {
            displayMessageReceive(message.message, message.sent_datetime.split(",")[2])
        }
    })


    // for (const message of allHistory) {
    //     let userId = +document.querySelector("hr").dataset.id;
    //     console.log(userId)
    //     if (message.user_id === userId) {
    //         displayMessageSend(message.message, message.sent_datetime.split(",")[2])
    //     } else {
    //         displayMessageReceive(message.message, message.sent_datetime.split(",")[2])
    //     }
    // }
})

// let allHistory = JSON.parse(localStorage.getItem(roomId))
// for (const message of allHistory) {
//     if (message.name === myName) {
//         displayMessageSend(message.text, message.time)
//     } else {
//         displayMessageReceive(message.text, message.time)
//     }
// }




socket.emit('join-room', roomId, message => {
    // displayMessageSend(message)
})
requestAnimationFrame(() => {
    document.getElementById('message-container').scrollTo(0, document.getElementById('message-container').scrollHeight)
})


if (!localStorage.getItem(roomId)) {
    localStorage.setItem(roomId, JSON.stringify([]));
}

let chatHistory = JSON.parse(localStorage.getItem(roomId));


socket.on("receive-message", message => {
    displayMessageReceive(message.text, message.time.split(",")[2])
    // chatHistory.push(message);
    // localStorage.setItem(roomId, JSON.stringify(chatHistory));
})


form.addEventListener("submit", e => {
    e.preventDefault()
    let message = {
        time: luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED),
        text: messageInput.value,
        name: myName,
    }
    const roomId = document.getElementById("message-container").dataset.room

    if (message.text === "") return
    displayMessageSend(message.text, message.time.split(",")[2])

    socket.emit(`send-message`, message, roomId)
    messageInput.value = ""

    axios.post("/message", {message, roomId})

    // chatHistory.push(message);
    // localStorage.setItem(roomId, JSON.stringify(chatHistory));
    scrollDown()
})

function scrollDown() {
    document.getElementById('message-container').scrollTop =  document.getElementById('message-container').scrollHeight
}






function displayMessageSend(message, time) {
    const div = document.createElement("div")
    const timeDiv = document.createElement("div")
    const frameDiv = document.createElement("div")
    frameDiv.classList.add("myFrame")
    frameDiv.classList.add("frame")
    div.classList.add("message")
    timeDiv.classList.add("time")
    div.textContent = message
    timeDiv.textContent = time

    frameDiv.append(div, timeDiv)
    document.getElementById("message-container").append(frameDiv)
}


function displayMessageReceive(message, time) {
    const div = document.createElement("div")
    const timeDiv = document.createElement("div")
    const frameDiv = document.createElement("div")
    frameDiv.classList.add("frame")
    frameDiv.classList.add("TheirFrame")
    div.classList.add("message")
    timeDiv.classList.add("time")

    div.textContent = message
    timeDiv.textContent = time
    frameDiv.append(div, timeDiv)
    document.getElementById("message-container").append(frameDiv)

}

document.querySelector(".backBtn").addEventListener("click", e => {
    e.preventDefault()
    window.location = "/chatList"
})


