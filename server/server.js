
// API:
const express = require('express');
const app = express();
const rooms = [];


// Cors Setting
const cors = require('cors');

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));


app.get('/create', async (req, res) => {
    let portNum = await findAvaliablePort();
    if(portNum === 0){
        res.end('0');
        console.log("PORT IS 0");
        return;
    }
    openNewSocket(portNum);
    res.end(JSON.stringify(portNum))
    rooms.push(portNum);
});

app.get('/', async(req, res) => {
    res.end(JSON.stringify(rooms));
    console.log("SLDIFJOWIPEG");
});


app.listen(3000, () =>{
    console.log("server listening at port: ", 3000);
});



// Web Socket
const ws = new require('ws');
const portscanner = require('portscanner');

const startPort = 2000;
const endPort = 20000;
async function findAvaliablePort(){
    return await portscanner.findAPortNotInUse(startPort, endPort, '127.0.0.1');
}

function openNewSocket(port){
    const wss = new ws.Server({port: port});

    const clients = new Set();


    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log(`Port: ${port}, New Connection, currently ${clients.size} online`);
        ws.send("Welcome");

        let clientName;

        ws.on('message', function(message_BINARY) {
            // binary to string
            let message = String.fromCharCode(...message_BINARY);
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
            if(clients.size === 0){
                ws.close();
            }
            console.log("Connection closed");
        });
    });
    console.log("CREATED PORT: ", port);
}

