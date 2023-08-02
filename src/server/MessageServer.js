//Handles all socket communication for the server

// const ws = new require('ws');
import ChessboardNode from '../Components/scripts/ChessboardLogic.js';
import {WebSocketServer} from 'ws';

const portNum = 3001;
const wss = new WebSocketServer({port: portNum});
const clients = new Set();
const clientInfos = new Map();
// TODO: 
//  NOT const, should be modifiable
const cooldownTime = 3000;
const maxMoveHold = 3;

// possibly timeout 10(?) seconds to check if any client connected, 
//  if no clients are in the room then close it immediately\
// I need chessboard
//  New one;
const chessboard = new ChessboardNode();

let first = true;
wss.on('connection', (ws) => {
    clientInfos.set(ws, {
        serverOwner: first,
        savedCDTime : -1,
        lastCommandTime : Date.now(),
    });
    first = false;
    ws.send('B' + chessboard.getBoardAsMessage());
    clients.add(ws);
    console.log(`Port: ${portNum}, New Connection, currently ${clients.size} online`);

    // Send cooldown to begin:
    ws.send('t' + -1); 
    ws.send('C' + cooldownTime.toString());
    ws.send('P' + maxMoveHold.toString());

    ws.on('message', function(message_BINARY) {
        let message = String.fromCharCode(...message_BINARY);
        let msgType = message[0];
        if(message.length < 1) return;
        let msgData = message.substring(1);
        console.log('data:', msgData);
        switch(msgType) {
        case 'M':{ // move
            // validate Cooldown:
            const currTime = Date.now();
            clientInfos.get(ws).savedCDTime += currTime - clientInfos.get(ws).lastCommandTime;
            clientInfos.get(ws).lastCommandTime = currTime;

            if(clientInfos.get(ws).savedCDTime > cooldownTime * maxMoveHold){
                clientInfos.get(ws).savedCDTime = cooldownTime * maxMoveHold;
            }
            if(clientInfos.get(ws).savedCDTime < cooldownTime){
                ws.send('ECooldown Not Finished');
                return;
            }

            // Validate Move:
            let fromX = Number(msgData[0]);
            let fromY = Number(msgData[1]);
            let toX = Number(msgData[2]);
            let toY = Number(msgData[3]);

            if(!chessboard.checkMove(fromX, fromY, toX, toY)){
                ws.send('EInvalid Move');
                return;
            }
            clientInfos.get(ws).savedCDTime -= cooldownTime;
                        
            // Send current Cooldown:
            ws.send('t' + clientInfos.get(ws).savedCDTime.toString());

            chessboard.move(fromX, fromY, toX, toY);
            chessboard.findAllValidMoves();

            // Send client moves
            for(let client of clients) {
                client.send(message);
            }
            // console.log("")
            break;
        }
        case 'B':{ // board (req/send)
            ws.send('B' + chessboard.getBoardAsMessage());
            break;
        }
        case 'S':{ // start
            chessboard.resetBoard();
            const currTime = Date.now();
            for(let client of clients){
                client.send('B' + chessboard.getBoardAsMessage());
                clientInfos.get(client).lastCommandTime = currTime;
                clientInfos.get(client).savedCDTime = 0;
                // reset all client CD:
                ws.send('t' + -1);
                ws.send('C' + cooldownTime.toString());
                ws.send('P' + maxMoveHold.toString());
            }
            break;
        }
        case 'N': // client's name                
            break;
        // Server will send 'T' to client, not receive
        // case 'T': // team
        //     break;
//        case 'C': // cooldown
//            break;
        }
        console.log('Received Message', message);
    });

    // ws.on('close', () =>{
    //     console.log('Connection closed');
    //     clients.delete(ws);
    //     if(clientInfos.get(ws).serverOwner){
    //         // if owner left the room, either:
    //         //  - close the room
    //         //  OR
    //         //  - pass owner to another player;
            
    //         // CURR: close all connection and room
    //         for(let client of clients){
    //             client.send('EServer owner left the room, Server closed');
    //             client.close();
    //         }
    //         wss.close();
    //     }
    // });

    // ws.on('Chess piece moved')
});
console.log('CREATED PORT: ', portNum);


