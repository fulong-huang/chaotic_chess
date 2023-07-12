import React from 'react';

export default function ChessboardPiece (props) {
    return (
        <div className="chessboard-piece">
            {props.piece && <img src={`imgs/${props.piece}.png`} alt={"chess cell"} style={{height: '69px'}}/>}
        </div>
    );
};