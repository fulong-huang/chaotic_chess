// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react'
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChessboardNode from './Components/scripts/ChessboardLogic.js';
import ChessboardRenderer from './Components/ChessboardRenderer.js'; 
import Lobby from './Components/Lobby.js';

const chessboard = new ChessboardNode();

const portNum = 3001;

const socket = new WebSocket(`ws://localhost:${portNum}`);
console.log(`connected to port ${portNum}`);

socket.addEventListener('error', () => {
    console.log('ERROR, Connection Failed');
});


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

socket.addEventListener('close', () => {
    console.log('Server was closed');
    socket.close();
});
let count = 0;
function App() {

    const [board, setBoard] = useState(chessboard.getBoard());
    const [validTiles, setValidTiles] = useState([]);

    useEffect(() => {
        if(count > 0) return;
        count++;
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
            case 'B': // board (req/send)
                break;
            case 'S': // start
                break;            
            // client will send 'N', not receive
            // case 'N': // name
            //     break;
            case 'T': // team
                break;
            case 'C': // cooldown
                break;
            }
            return () => {
                //socket.removeEventListener('message', handleSocketMessage);
            };
        });
        
    }, []);

    // create client and stuff (returned from lobby)
    //    pass in setBoard to your thing
    //    since setBoard is hooked to the board, updating board using setBoard
    //          will also update your display
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<ChessboardRenderer 
                    chessboard={chessboard} 
                    board={board} 
                    setBoard={setBoard} 
                    socket={socket}
                    validTiles={validTiles}
                    setValidTiles={setValidTiles}
                />}/>
                <Route path="/lobby" element = {<Lobby/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
