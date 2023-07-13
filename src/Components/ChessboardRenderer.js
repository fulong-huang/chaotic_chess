import './ChessboardRenderer.css';
import React, { useEffect, useState } from 'react';
import ChessboardNode from './scripts/ChessboardLogic.js';

const chessboard = new ChessboardNode();

export default function ChessboardRenderer() {

    const [board, setBoard] = useState(chessboard.getBoard());
    
    const onChessboardPieceClick = (xpos, ypos) => {
        if(chessboard.selectPiece(xpos, ypos)) {
            setBoard([...chessboard.getBoard()]);
        }
    }
    
    const chessboardRender = () => {
        const chessboardDisplay = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const cellColor = (i + j) % 2 === 0 ? 'dodgerblue' : '#363457';
                chessboardDisplay.push(
                    <div
                        key={`${i}${j}`}
                        className="chessboard_cell"
                        style={{backgroundColor: cellColor}}
                        onClick = {() => {onChessboardPieceClick(i, j)}}
                    >
                        {
                            board[i][j] && 
                            <img src={`imgs/${board[i][j]}.png`} 
                                alt={"chess cell"}
                                style={{height: '69px'}}
                                className ="chessboard_piece"
                            />
                        }
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
