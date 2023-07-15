import './ChessboardRenderer.css';
import React, { useEffect, useState } from 'react';
import ChessboardNode from './scripts/ChessboardLogic.js';

export default function ChessboardRenderer(props) {

    const [board, setBoard] = useState(props.chessboard.getBoard());
    const [selectedPiece, setSelectedPiece] = useState([]);
    const [validTiles, setValidTiles] = useState([]);

    const onChessboardPieceClick = (xpos, ypos) => {
        // if move, get new board
        if(props.chessboard.selectPiece(xpos, ypos)) {
            setBoard([...props.chessboard.getBoard()]);
            console.log("piece is moved");
            setValidTiles([]);
        }
        // get selected piece from board, 
        //  set selected piece from result.
        setSelectedPiece([...props.chessboard.prevSelectedPos])
        //if selected piece is available, get all valid movements
        if([...props.chessboard.prevSelectedPos].length !== 0) {setValidTiles([...props.chessboard.getValidMovements(xpos,ypos)]);}
        else {
            console.log("piece is unselected");
            setValidTiles([]);
        }
    }

    const isTileValid = (xpos, ypos) => {
        return validTiles.some((tile) => tile[0] === xpos && tile[1] === ypos);
    };
    
    const chessboardRender = () => {
        const chessboardDisplay = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const cellColor = (i + j) % 2 === 0 ? 'dodgerblue' : '#363457';
                const isPieceSelected = selectedPiece && selectedPiece[0] === i && selectedPiece[1] === j;
                const isTileHighlighted = isTileValid(i, j);
                // const tileStyle = isTileHighlighted ? { backgroundColor: 'green' } : { backgroundColor: cellColor };
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
                                style={
                                    {height: '69%', 
                                    width: '69%', 
                                    pointerEvents: "none", 
                                    userSelect: "none"
                                }}
                                className ="chessboard_piece"
                            />)
                        }
                        {isPieceSelected && <div className="overlay-circle"></div>}
                        {isTileHighlighted && <div className="valid-move"></div>}
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
