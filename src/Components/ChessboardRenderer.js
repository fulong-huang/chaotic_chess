import './ChessboardRenderer.css';
import React, { useEffect, useState } from 'react';
import ChessboardNode from './scripts/ChessboardLogic.js';

const chessboard = new ChessboardNode();

export default function ChessboardRenderer() {

    const [board, setBoard] = useState(chessboard.getBoard());
    const [selectedPiece, setSelectedPiece] = useState([]);
    
    const onChessboardPieceClick = (xpos, ypos) => {
        if(chessboard.selectPiece(xpos, ypos)) {
            setBoard([...chessboard.getBoard()]);
        }
        setSelectedPiece([...chessboard.prevSelectedPos])
    }
    
    const chessboardRender = () => {
        const chessboardDisplay = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const cellColor = (i + j) % 2 === 0 ? 'dodgerblue' : '#363457';
                const isPieceSelected = selectedPiece && selectedPiece[0] === i && selectedPiece[1] === j;
                chessboardDisplay.push(
                    <div
                        key={`${i}${j}`}
                        className="chessboard_cell"
                        style={{backgroundColor: cellColor}}
                        onClick = {() => {onChessboardPieceClick(i, j)}}
                    >
                        {
                            board[i][j] && 
                            (<img src={`imgs/${board[i][j]}.png`} 
                                alt={"chess cell"}
                                style={{height: '69%', width: '69%'}}
                                className ="chessboard_piece"
                            />)
                        }
                        {isPieceSelected && <div className="overlay-circle"></div>}
                    </div>
                )
            }
        }
        return chessboardDisplay;
    }


    return (
        <div>
            <div className="chessboard">
                {chessboardRender()}
            </div>
        </div>
    );
}
