const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const formatMessage = require("./utils/messages");
const {userAdd, getCurrentUser, userLeave, getRoomUser} = require("./utils/users");


const app = express();

const port = process.env.PORT || 9000;
const server = http.createServer(app);

const io = socketIo(server);

//static folder
app.use(express.static(path.join(__dirname, "public")));
const bot = "Chat";
//client connects
io.on("connection",socket=>{
    socket.on("joinRooms",({username,room})=>{

        const users = userAdd(socket.id, username, room);
        socket.join(users.room);

        //single client
        socket.emit("message",formatMessage(bot,"Welcome to Chat"));

        //broadcast when user connects
        //all of the client except the client is connecting
        //add .to(user.room) to add to specific room
        socket.broadcast.to(users.room).emit("message",formatMessage(bot,`${users.username} has join the chat`));

        //Send room and users info
        io.to(users.room).emit("roomUsers",{
            room: users.room,
            users: getRoomUser(users.room)
        })


    });


    //this is for all the client in general
    // io.emit()

    //client disconnect
    socket.on("disconnect",()=>{
        const user = userLeave(socket.id);
        // console.log(user);
        if (user){
            io.to(user.room).emit("message",formatMessage(bot,`${user.username} has left the chat`));

            //Send room and users info
            io.to(user.room).emit("roomUsers",{
                room: user.room,
                users: getRoomUser(user.room)
            })

        }
    });

    //Listen for chat message
    socket.on("chatMessage",(msg)=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message",formatMessage(user.username,msg));
    })
});

server.listen(port,()=>console.log(`listening to: ${port}`));
