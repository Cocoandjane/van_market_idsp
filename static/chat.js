import axios from 'https://cdn.skypack.dev/axios'
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')


axios.get("/curentUserName")
.then(response => {
    let curUser = response.data.username  
    const socket = io();
// Message to DOM 
function appendMessage(message) {
    let div = document.createElement('div');
    div.innerHTML = ` <p class="meta"> ${curUser} <span>${message.time}</span></p>
                            <p class="text">
                            ${message.text}
                            </p>`
    let chatMessage = document.querySelector('.chat-messages');
    chatMessage.appendChild(div)
}

socket.on('message', message => {
    // console.log(message)
    // Message from server
    appendMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})


chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let msg = e.target.elements.msg.value
    // console.log(msg)

    //emitting msg to server
    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})
})