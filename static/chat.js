import axios from 'https://cdn.skypack.dev/axios'
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io();

axios.get("/curentUserName")
    .then(response => {
        //console.log(response.data.username)
        let curUser = response.data.username
        // console.log(curUser)


        // Message to DOM 
        function appendMessage(message) {
            console.log(message.username)
            let div = document.createElement('div');
            //<p class="meta"> ${message.username} <span>${message.time}</span></p>
            // <p class="meta"> <span>${message.time}</span></p>
            div.innerHTML = `
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
            socket.emit('chatMessage', `${curUser}:`)
            socket.emit('chatMessage', msg)

            // Clear input
            e.target.elements.msg.value = ''
            e.target.elements.msg.focus()
        })
    })