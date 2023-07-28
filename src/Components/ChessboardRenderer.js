import './ChessboardRenderer.css';
import React, { useState } from 'react';
//import ChessboardNode from './scripts/ChessboardLogic.js';
import RightHandMenu from './RightHandMenu.js';
import {Box} from '@mui/material';
import { PropTypes } from 'prop-types';

ChessboardRenderer.propTypes = {
    chessboard: PropTypes.object,
    board: PropTypes.array,
    setBoard: PropTypes.func,
    socket: PropTypes.object,
    validTiles: PropTypes.array,
    setValidTiles: PropTypes.func,
};

export default function ChessboardRenderer(props) {

    // const [board, setBoard] = useState(props.chessboard.getBoard());
    const [selectedPiece, setSelectedPiece] = useState([]);
    
    const onChessboardPieceClick = (xpos, ypos) => {
        // if move is valid, get new board
        if(props.chessboard.selectPiece(xpos, ypos)) {
            let msg = 'M';
            msg += selectedPiece[0].toString();
            msg += selectedPiece[1].toString();
            msg += xpos.toString();
            msg += ypos.toString();
            props.socket.send(msg);
            //props.setBoard([...props.chessboard.getBoard()]);
            console.log('setboard======');
            props.setValidTiles([]);
        }
        // get selected piece from board, 
        //  set selected piece from result.
        setSelectedPiece([...props.chessboard.prevSelectedPos]);
        //if selected piece is available, get all valid movements
        if([...props.chessboard.prevSelectedPos].length !== 0) {props.setValidTiles([...props.chessboard.getValidMovements(xpos,ypos)]);}
        else {
            props.setValidTiles([]);
        }
    };

    const isTileValid = (xpos, ypos) => {
        return props.validTiles.some((tile) => tile[0] === xpos && tile[1] === ypos);
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
                    <Box
                        key={`${i}${j}`}
                        className="chessboard_cell"
                        style={{backgroundColor: cellColor}}
                        onClick = {() => {onChessboardPieceClick(i, j);}}
                    >
                        {
                            props.board[i][j] && 
                            (<img src={`imgs/${props.board[i][j]}.png`} 
                                alt={'chess cell'}
                                style={
                                    {
                                        height: '69%', 
                                        width: '69%', 
                                        pointerEvents: 'none', 
                                        userSelect: 'none'
                                    }}
                                className ='chessboard_piece'
                            />)
                        }
                        {isPieceSelected && <Box className='overlay-circle'></Box>}
                        {isTileHighlighted && <Box className='valid-move'></Box>}
                    </Box>
                );
            }
        }
        return chessboardDisplay;
    };


    return (
        <>
            <button onClick={()=>{props.socket.send('B');}}> Request Board </button>
            <button onClick={()=>{props.socket.send('S');}}> Restart </button>
            <Box
                style={{ height: '100vh', 
                    overflow: 'auto', 
                    backgroundColor: '#282c34', 
                    display: 'flex', 
                    justifyContent: 'center'
                }}
            >
                <Box className='chessboard'>
                    {chessboardRender()}
                </Box>
                <RightHandMenu chessboard={props.chessboard}/>
            </Box>
        </>
    );
}
