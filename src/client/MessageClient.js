import ChessboardNode from '../Components/scripts/ChessboardLogic.js';
import PropTypes from 'prop-types';
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

MessageClient.PropTypes = {
    setBoard: PropTypes.func, 
    setCooldownPassed: PropTypes.number, 
    setMaxMoveHold: PropTypes.func
};

export default function MessageClient(props) {
    // const [board, setBoard] = useState(tempboard.getBoard());
    // const sendMessageToServer = (msg) => {
    let prevCooldownReceived = -1;
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
            props.setBoard([...chessboard.getBoard()]);
            chessboard.prevSelectedPos = [];
            break;
        case 'B':{ // board (req/send)
            chessboard.setBoardFromMessage(msgData);
            props.setBoard([...chessboard.getBoard()]);
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
            // cooldown time PASSED since last move
            console.log('Cooldown Received: ' , Number(msgData));
            // must reassign different value, in order to trigger useEffect
            let newCooldown = Number(msgData);
            if(prevCooldownReceived === newCooldown){
                newCooldown++;
            }
            props.setCooldownPassed(newCooldown);
            prevCooldownReceived = newCooldown;
            break;
        }
        case 'C':{
            // cooldown client has to wait before making a move
            console.log('Current Cooldown is set to: ', Number(msgData));
            break;
        }
        case 'P':{
            console.log(`Currently can only hold ${Number(msgData)} movement points`);
            props.setMaxMoveHold(Number(msgData));
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
