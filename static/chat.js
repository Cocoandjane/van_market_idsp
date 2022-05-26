

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


socket.emit('join-room', roomId, message => {
    // displayMessageSend(message)
})



if (!localStorage.getItem("chat")) {
    localStorage.setItem("chat", JSON.stringify([]));
}
let chatHistory = JSON.parse(localStorage.getItem("chat"));


socket.on("receive-message", message => {
    displayMessageReceive(message.text)
    displayMessageReceive(message.time)
    localStorage.setItem("chat", JSON.stringify(chatHistory));
    chatHistory.push(message);
})


form.addEventListener("submit", e => {
    e.preventDefault()
    let message = {
        time: luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED).split(",")[2],
        text: messageInput.value,
        name: myName,
    }
    const roomId = document.getElementById("message-container").dataset.room

    if (message.text === "") return
    displayMessageSend(message.text)
    displayMessageSend(message.time)

    socket.emit(`send-message`, message, roomId)
    messageInput.value = ""
    chatHistory.push(message);
    localStorage.setItem("chat", JSON.stringify(chatHistory));
    // localData = localStorage.getItem("chat");
    // localData = JSON.parse(localData);
  
})

let allHistory = JSON.parse(localStorage.getItem("chat"))
    console.log(allHistory)
    for (const message of allHistory) {
        if(message.name === myName){
            displayMessageSend(message.text)
            displayMessageSend(message.time)
        }else{
            displayMessageReceive(message.text) 
            displayMessageReceive(message.time) 
        }
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

document.querySelector(".backBtn").addEventListener("click", e => {
    e.preventDefault()
    history.back()
})


