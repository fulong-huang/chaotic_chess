// import logo from './logo.svg';
import './App.css';
import ChessboardRenderer from './Components/ChessboardRenderer';
import RightHandMenu from './Components/RightHandMenu';
import React, {useState, useEffect} from 'react'

import ChessboardNode from './Components/scripts/ChessboardLogic.js';

const chessboard = new ChessboardNode();

function App() {

  return (
    <div className="App" 
      style={{ height: '100vh', 
            overflow: 'auto', 
            backgroundColor: '#282c34', 
            display: "flex", 
            justifyContent: "center"
            }}
    >
      <div style={{paddingTop:"100px"}}>
          <ChessboardRenderer chessboard={chessboard}/>
      </div>
      <RightHandMenu chessboard={chessboard}/>
    </div>
  );
}

export default App;
