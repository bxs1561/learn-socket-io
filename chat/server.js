const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const formatMessage = require("./utils/messages");


const app = express();

const port = process.env.PORT || 9000;
const server = http.createServer(app);

const io = socketIo(server);

//static folder
app.use(express.static(path.join(__dirname, "public")));
const username = "lucky";
//client connects
io.on("connection",socket=>{
    socket.on("joinRooms",({user,room})=>{
        //single client
        socket.emit("message",formatMessage(username,"Welcome to Chat"));

        //broadcast when user connects
        //all of the client except the client is connecting
        socket.broadcast.emit("message",formatMessage(username,"user has join the chat"));
    })

    //this is for all the client in general
    // io.emit()

    //client disconnect
    socket.on("disconnect",()=>{
        io.emit("message",formatMessage(username,"user has left the chat"));
    });

    //Listen for chat message
    socket.on("chatMessage",(msg)=>{
        io.emit("message",formatMessage("USER",msg));
    })
});

server.listen(port,()=>console.log(`listening to: ${port}`));
