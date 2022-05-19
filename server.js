import app from "./app.js"
import http from "http"
import { createServer } from "http"
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages.js";
import { response } from "express";
import axios from "axios";


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

let admin = "Admin: ";

//when a user connects
io.on('connection', (socket) => {
    console.log("new WS connection", socket.id)

    socket.emit('message', formatMessage(admin, "welcome to Chatroom")); // socket.emit?

    //when a user disconnects
    socket.on('disconnect', () => {
        io.emit('messaeg', formatMessage(admin, 'A user has left the chat'));
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    }) 

})


  
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`server should be running at http://localhost:${port}/`))

