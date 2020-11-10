const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");

//Getting username and chat room from url params
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true,
});

//joining chat room
socket.emit("joinRooms",{
    username,
    room
});

//message from server
socket.on("message",message=>{
    console.log(message);
    outputMessage(message);

    //scroll down
    //automatically scroll down when message is input
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

//submit message
chatForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const msg = event.target.elements.msg.value;

    //emit message to server
    socket.emit("chatMessage",msg);

    //clear input messages
    event.target.elements.msg.value = " ";
    event.target.elements.msg.focus();

});

//output msg to dom
const outputMessage=(message)=>{
    const div = document.createElement("div");
    //this will get the all the class inside div
    div.classList.add("message");
    div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
                <p class="text">
                ${message.text}
                </p>`;
    //whenever message is create, it should add new div to chat-messages
    document.querySelector(".chat-messages").appendChild(div)
}
