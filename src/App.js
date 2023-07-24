// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react'
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChessboardNode from './Components/scripts/ChessboardLogic';
import ChessboardRenderer from './Components/ChessboardRenderer'; 
import Lobby from './Components/Lobby';

const chessboard = new ChessboardNode();

const portNum = 3001;

const socket = new WebSocket(`ws://localhost:${portNum}`);
console.log(`connected to port ${portNum}`);

socket.addEventListener('error', () => {
    alert('ERROR, Connection Failed');
});

socket.addEventListener('message', (msg) => {
    console.log(msg.data);
});

socket.addEventListener('close', () => {
    alert('Server was closed');
    socket.close();
});

function App() {

    const [board, setBoard] = useState(chessboard.getBoard());
    // create client and stuff (returned from lobby)
    //    pass in setBoard to your thing
    //    since setBoard is hooked to the board, updating board using setBoard
    //          will also update your display
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<ChessboardRenderer chessboard={chessboard} board={board} setBoard={setBoard} socket={socket}/>}/>
                <Route path="/lobby" element = {<Lobby/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
