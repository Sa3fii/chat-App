import { createServer } from "http";
import { Server } from "socket.io"
import { config } from "dotenv"

config();

const socketServer = createServer();
const io = new Server(socketServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

let connectedUsers = [];


io.on("connection", (socket) => {
    console.log('connection to socket succesful');

    socket.on('register', (data) => {
        connectedUsers.push({ socketID: socket.id, userID: data })
        const connectedIds = connectedUsers.map((user)=> {return { id :  user.userID }})
        io.emit('receive_online',connectedIds)
        console.log('after connection ', connectedUsers)
    }) 

    socket.on('send_message', (data) => {
        // const destSocket = connectedUsers.filter((user)=> user.userID==data.dest).map((user)=>user.socketID)
        const destSocket = connectedUsers.findIndex((elmnt)=> elmnt.userID == data.dest )
        console.log(destSocket)
        if (destSocket !== -1) socket.to(connectedUsers[destSocket].socketID).timeout(5000).emit('receive_message', data.msg)
    });

    socket.on('disconnect', (reason) => {
        const pos = connectedUsers.map(e => e.socketID).indexOf(socket.id);
        connectedUsers.splice(pos, 1)
        // console.log("socket", socket)
        io.emit('receive_online',connectedUsers.map((user)=>user.userID))
        console.log('after deconnection', connectedUsers)
        console.log("connection to socket ended", reason)
    })
})

const SOCKET_PORT = process.env.SOCKET_PORT || 5000;

socketServer.listen(SOCKET_PORT, (error) => {
    if (error) console.log("Unable to start socket the server");
    else console.log(`Socket server listening on port ${SOCKET_PORT}`);
});