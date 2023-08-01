import ChessboardNode from '../Components/scripts/ChessboardLogic.js';
// import React, { useState } from 'react';
// const tempboard = new ChessboardNode();
export const chessboard = new ChessboardNode();
// const tempboard = chessboard;
const portNum = 3001;
const socket = new WebSocket(`ws://localhost:${portNum}`);
console.log(`connected to port ${portNum}`);
socket.addEventListener('error', () => {
    console.log('ERROR, Connection Failed');
});
/* eslint-disable */
    // move: M
    // board: B
    // start: S
    // cooldown: C
    // ????
    //  After T, it will contains number of white team, then white player's name
    //                            then rest will be black player's name
    // white: a, b
    // balck: c
    // msg: T2,a,b,c
    // name: N
    // Team: T
/* eslint-enable */    
socket.addEventListener('close', () => {
    console.log('Server was closed');
    socket.close();
});

export default function MessageClient(setBoard) {
    // const [board, setBoard] = useState(tempboard.getBoard());
    // const sendMessageToServer = (msg) => {z
    socket.addEventListener('message', (msg) => {
        // msg.data: message (string) send by the server
        // console.log(msg.data);
        let msgType = msg.data[0];
        let msgData = msg.data.substr(1);
        console.log('Msg: ', msgData);
        switch(msgType) {
        case 'M': // move
            //if move, get ChessboardLogic to move piece
            //  move only have 1122, no Q
            chessboard.prevSelectedPos = [Number(msgData[0]), Number(msgData[1])];
            chessboard.move(Number(msgData[0]), Number(msgData[1]), 
                Number(msgData[2]), Number(msgData[3]));
            chessboard.findAllValidMoves();
            setBoard([...chessboard.getBoard()]);
            chessboard.prevSelectedPos = [];
            break;
        case 'B':{ // board (req/send)
            chessboard.setBoardFromMessage(msgData);
            setBoard([...chessboard.getBoard()]);
            break;
        }
        case 'S': // start
            break;            
        // client will send 'N', not receive
        // case 'N': // name
        //     break;
        case 'T': // team
            break;
        case 't': { // cooldown
            // TODO: set current cooldown to received value;
            chessboard.setCooldown(Number(msgData));
            // setCooldown(Number(msgData));
            // console.log('Current Cooldown is set to: ', chessboard.getCooldownTime());
            break;
        }
        case 'C':{
            // TODO: set current cooldown to received value;
            chessboard.setCooldownTime(Number(msgData));
            // setCooldownTime(Number(msgData));
            // console.log('Current Cooldown is set to: ', chessboard.getCooldown());
            break;
        }
        case 'P':{
            chessboard.setMaxMoveHold(Number(msgData));
            // setMaxMoveHold(Number(msgData));
            // console.log('Current Max Hold is set to: ', chessboard.getMaxMoveHold());
            break;
        }
        }
        return () => {
            //socket.removeEventListener('message', handleSocketMessage);
        };
    });
    // }    
    return socket;
}
// export chessboard;