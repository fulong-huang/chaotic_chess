// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChessboardNode from './Components/scripts/ChessboardLogic';
import ChessboardRenderer from './Components/ChessboardRenderer'; 
import Lobby from './Components/Lobby';



const chessboard = new ChessboardNode();

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<ChessboardRenderer chessboard={chessboard}/>}/>
                <Route path="/lobby" element = {<Lobby/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
