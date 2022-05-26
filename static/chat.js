

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



if (!localStorage.getItem(roomId)) {
    localStorage.setItem(roomId, JSON.stringify([]));
}

let chatHistory = JSON.parse(localStorage.getItem(roomId));


socket.on("receive-message", message => {
    displayMessageReceive (message.text,message.time)
    chatHistory.push(message);
    localStorage.setItem(roomId, JSON.stringify(chatHistory));
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
    displayMessageSend(message.text,message.time)
    // displayTimeSend(message.time)

    socket.emit(`send-message`, message, roomId)
    messageInput.value = ""
    chatHistory.push(message);
    localStorage.setItem(roomId, JSON.stringify(chatHistory));
    // localData = localStorage.getItem("chat");
    // localData = JSON.parse(localData);
    requestAnimationFrame(() => {
        let container = document.getElementById("message-container")
        container.s.animate({ scrollTop: 20000000 }, "slow");
    })
})

let allHistory = JSON.parse(localStorage.getItem(roomId))
    console.log(allHistory)
    for (const message of allHistory) {
        if(message.name === myName){
            displayMessageSend(message.text, message.time)
            // displayMessageSend(message.time)
        }else{
            displayMessageReceive(message.text, message.time) 
            // displayMessageReceive(message.time) s
        }
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

    frameDiv.append(div,timeDiv)
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
    frameDiv.append(div,timeDiv)
    document.getElementById("message-container").append(frameDiv)

}





document.querySelector(".backBtn").addEventListener("click", e => {
    e.preventDefault()
    history.back()
})


