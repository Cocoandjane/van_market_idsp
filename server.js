import app from "./app.js"
import http from "http"
import { createServer } from "http"
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});



io.on('connection', socket =>{
    // console.log(socket.id)
    socket.on("send-message", (message, room) => {
        if(room === ""){
            socket.broadcast.emit('receive-message', message)
        } else {
            socket.to(room).emit('receive-message', message)
        }
    })
    socket.on("join-room", (room, cb) =>{
        socket.join(room)
        cb(`Joined room ${room}`)
    })
})


const port = process.env.PORT || 8000

server.listen(port, () => console.log(`server should be running at http://localhost:${port}/`))

