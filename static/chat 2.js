import axios from 'https://cdn.skypack.dev/axios'

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io();
// Get username 
// const { username } = Qs.parse(location.search, {
//     ignoreQueryPrefix: true
// })
// console.log(username)



// export function login() {
//     let username = document.getElementById('login_name').value;
//     let password = document.getElementById('login_pass').value;
//     axios.post("http://localhost:3000/login", { username, password} )
//     .then(res => {
//         if(res.status) {
//             document.getElementById('login').hide();
//             document.getElementById('after-login').show();
//             sessionStorage.setItem("user", JSON.stringify(res.data));
//             document.getElementById('me').innerHTML = `
//                     <div class="me">
//                         <img src="/photos/smw.png" />
//                         ${res.data.user_full_name}
//                      </div>
//                      `;
//             console.log(res.data)
//             socket.emit('loggedin', res.data);
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// let logInButton = document.querySelector('Btn.loginBtn');
// logInButton.addEventListener('click', login)


// export function sendMyMessage (chatWidowId, fromUser, message)  {
//     let loggedInUser = JSON.parse(sessionStorage.getItem('user'))
//     let meClass = loggedInUser.user_id == fromUser.user_id ? 'me' : '';

//    document.getElementById('after-login').find(`#${chatWidowId} .body`).append(`
//         <div class="chat-text ${meClass}">
//             <div class="userPhoto">
//                 <img src="images/${fromUser.user_image}" />
//             </div>
//             <div>
//                 <span class="message">${message}<span>
//             </div>
//         </div>
//     `);
// }



// export function sendMessage (room) {
//     let loggedInUser = JSON.parse(sessionStorage.getItem('user'))
//     let message = document.getElementById(room).find('.messageText').value;
//     document.getElementById(room).find('.messageText').value;
//     socket.emit('message', {room: room, message:message, from: loggedInUser});
//     sendMyMessage(room, loggedInUser, message)
// }

// // hmmm
// function openChatWindow (room)  {
//     let roomId = document.getElementById(room)
//     if((roomId).length === 0 ) {
//         document.getElementById('after-login').append(`
//         <div class="chat-window" id="${room}">
//             <div class="body"></div>
//             <div class="footer">
//                 <input type="text" class="messageText"/><button onclick="sendMessage('${room}')">SEND</button>
//             </div>
//         </div>
//         `)
//     }
// }

// export function createRoom (id) {
//     let loggedInUser = JSON.parse(sessionStorage.getItem('user'));
//     let room = Date.now() + Math.random();
//     room = room.toString().replace(".","_");
//     socket.emit('create', {room: room, userId:loggedInUser.userId, withUserId:id});
//     openChatWindow(room);
// }

// // last
// socket.on('updateUserList', function(userList) {
//     let loggedInUser = JSON.parse(sessionStorage.getItem('user'));
//     document.getElementById('user-list').innerHTML = ('<ul></ul>');
//     userList.forEach(item => {
//         if(loggedInUser.user_id != item.user_id){
//             document.getElementById('user-list ul').append(`<li data-id="${item.user_id}" onclick="createRoom('${item.user_id}')">${item.user_full_name}</li>`)
//         }
//     });

// });

// socket.on('invite', function(data) {
//     socket.emit("joinRoom",data)
// });
// socket.on('message', function(msg) {
//     //If chat window not opened with this roomId, open it
//     let afterLogin = document.getElementById('after-login')
//     if(!afterLogin.find(document.getElementById(msg.room)).length) {
//         openChatWindow(msg.room)
//     }
//     sendMyMessage(msg.room, msg.from, msg.message)
// });


// Message to DOM 
function appendMessage(message) {
        let div = document.createElement('div');
        div.innerHTML = ` <p class="meta"> ${message.username} <span>${message.time}</span></p>
                                <p class="text">
                                ${message.text}
                                </p>`
        let chatMessage = document.querySelector('.chat-messages');
        chatMessage.appendChild(div)
    }
    
    socket.on('message', message => {
        console.log(message)
        // Message from server
        appendMessage(message)
    
        // Scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight
    })
    
    
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        msg = e.target.elements.msg.value
        console.log(msg)
    
        //emitting msg to server
        socket.emit('chatMessage', msg)
    
        // Clear input
        e.target.elements.msg.value = ''
        e.target.elements.msg.focus()
    })
    