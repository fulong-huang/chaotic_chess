const socket = new WebSocket("ws://localhost:8080");

//socket.addEventListener("open", (event) => {
//    socket.send("HELLO SERVER!");
//});

socket.addEventListener("message", (event) => {
    console.log("message from server: ", event.data);
    chatContent.append(event.data);
    let p = document.createElement('br');
    chatContent.append(p);
});

const inputBox = document.getElementById('input-box-client');
const chatContent = document.getElementById('chat-content');

function onClickSend(){
    socket.send(inputBox.value);
    console.log(inputBox.value)
    inputBox.value = "";
}


