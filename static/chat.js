

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



let dt = DateTime.now()
console.log(dt.toLocaleString())
console.log(dt.toLocaleString(DateTime.DATETIME_MED))

socket.on("receive-message", message => {
    displayMessageReceive(message)
})

let roomId = document.getElementById("message-container").dataset.room

socket.emit('join-room', roomId, message =>{
    // displayMessageSend(message)
})

// console.log(Date.now().toString)

// let d = new Date(Date.now())
// console.log(d.toString())

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    // const room = roomInput.value
    const room  = document.getElementById("message-container").dataset.room
    if(message === "" ) return
    displayTime(Date.now())
    displayMessageSend(message)
    socket.emit(`send-message`, message, room)
    messageInput.value = ""
})

function displayTime(time) {
    const div = document.createElement("div") 
    div.textContent = time
    document.getElementById("message-container").append(div)
}

function displayMessageSend(message) {
    const div = document.createElement("div")
    div.classList.add("mytext")
    div.classList.add("messages")
    div.textContent = message
    document.getElementById("message-container").append(div)

}


function displayMessageReceive(message) {
    const div = document.createElement("div")
    div.classList.add("messages")
    div.textContent = message
    document.getElementById("message-container").append(div)

}

document.querySelector(".backBtn").addEventListener("click", e =>{
    e.preventDefault()
    history.back()
})
