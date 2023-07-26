// const ChessboardNode = require("./ChessboardLogic.js");

// const ws = new require('ws');
import ChessboardNode from '../Components/scripts/ChessboardLogic.js';
import {WebSocketServer} from 'ws';

const portNum = 3001;
const wss = new WebSocketServer({port: portNum});
const clients = new Set();

// possibly timeout 10(?) seconds to check if any client connected, 
//  if no clients are in the room then close it immediately\
// I need chessboard
//  New one;
const chessboard = new ChessboardNode();
wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`Port: ${portNum}, New Connection, currently ${clients.size} online`);
    ws.send('wWelcome');
    ws.on('message', function(message_BINARY) {
        let message = String.fromCharCode(...message_BINARY);
        let msgType = message[0];
        if(message.length < 1) return;
        let msgData = message.substring(1);
        console.log('data:', msgData);
        switch(msgType) {
        case 'M':{ // move
            let fromX = Number(msgData[0]);
            let fromY = Number(msgData[1]);
            let toX = Number(msgData[2]);
            let toY = Number(msgData[3]);

            if(!chessboard.checkMove(fromX, fromY, toX, toY)){
                ws.send('EInvalid Move');
                return;
            }
            chessboard.move(fromX, fromY, toX, toY);
            chessboard.findAllValidMoves();
            
            // No Validation
            for(let client of clients) {
                client.send(message);
            }
            // console.log("")
            break;
        }
        case 'B': // board (req/send)
            break;
        case 'S': // start
            break;
        case 'N': // client's name                
            break;
        // Server will send 'T' to client, not receive
        // case 'T': // team
        //     break;
        case 'C': // cooldown
            break;
        }
        console.log('Received Message', message);
    });

    ws.on('close', () =>{
        console.log('Connection closed');
        clients.delete(ws);
        // //if(!clientName) return;
        // for(let client of clients){
        //     client.send(`${clientName} DISCONNECTED`);
        // }
        // if(clients.size === 0){
        //     console.log('CLOSE');
        //     wss.close();
        //     for(let i = 0; i < rooms.length; i++){
        //         if(rooms[i] === portNum){
        //             rooms.splice(i, 1);
        //             break;
        //         }
        //     }
        // }
    });

    // ws.on('Chess piece moved')
});
console.log('CREATED PORT: ', portNum);


