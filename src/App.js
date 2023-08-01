
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChessboardRenderer from './Components/ChessboardRenderer.js';
import Lobby from './Components/Lobby.js';

function App() {
    // create client and stuff (returned from lobby)
    //    pass in setBoard to your thing
    //    since setBoard is hooked to the board, updating board using setBoard
    //          will also update your display
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ChessboardRenderer/>} />
                <Route path="/lobby" element={<Lobby />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
