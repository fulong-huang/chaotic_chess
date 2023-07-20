const ws = new require('ws');
const wss = new ws.Server({port: 8080});

const clients = new Set();


wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`New Connection, currently ${clients.size} online`);
    ws.send("Welcome");

    let clientName;

    ws.on('message', function(message_BINARY) {
        console.log("What", message_BINARY);
        let message = String.fromCharCode(...message_BINARY);
        console.log("Message is: ", message);
        if(clientName){
            message = `${clientName} : ${message}`;
            for(let client of clients){
                client.send(message);
            }
            return;
        }
        clientName = message;
        console.log("Set new client name to: ", clientName);
        message = `${clientName} JOINED`;
        for(let client of clients){
            client.send(message);
        }
    });

    ws.on('close', () =>{
        clients.delete(ws);
        if(!clientName) return;
        for(let client of clients){
            client.send(`${clientName} DISCONNECTED`);
        }
        console.log("Connection closed");
    });
});

