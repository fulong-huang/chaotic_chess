const body = document.getElementById('body');

getAvailableRooms();

async function getAvailableRooms(){
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    for(const room of data){
        let b = document.createElement('button');
        b.textContent = room;
        b.onclick = connectToRoom.bind(null, room);
        body.append(b);
    }
}

async function createRoom(){
    const response = await fetch('http://localhost:3000/create');
    const data = await response.json();
    connectToRoom(data);
}

function connectToRoom(portNum){
    body.textContent = 'Text: ';
    const inputBox = document.createElement('input');
    const button = document.createElement('button');
    button.addEventListener('click', onClickSend);
    button.textContent = 'Send';
    const chatTitle = document.createElement('h2');
    chatTitle.textContent = 'Chat:';
    const chatContent = document.createElement('p');
    body.append(inputBox);
    body.append(button);
    body.append(chatTitle);
    body.append(chatContent);
//    const inputBox = document.getElementById('input-box-client');
//    const chatContent = document.getElementById('chat-content');

    const socket = new WebSocket(`ws://localhost:${portNum}`);
    console.log(`connected to port ${portNum}`);

    //socket.addEventListener("open", (event) => {
    //    socket.send("HELLO SERVER!");
    //});

    socket.addEventListener("message", (event) => {
        console.log("message from server: ", event.data);
        chatContent.append(event.data);
        let p = document.createElement('br');
        chatContent.append(p);
    });

    function onClickSend(){
        socket.send(inputBox.value);
        console.log(inputBox.value)
        inputBox.value = "";
    }
}


