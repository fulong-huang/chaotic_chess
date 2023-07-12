import './Chessboard.css';
import ChessboardPiece from './ChessboardPiece';

export default function Chessboard() {

    const chessboardRender = () => {
        const chessboard = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const cellColor = (i + j) % 2 === 0 ? 'dodgerblue' : '#363457';
                const piece = "pawn";
                chessboard.push(
                    <div
                        key={`${i}${j}`}
                        className="chessboard_cell"
                        style={{backgroundColor: cellColor}}
                    >
                        <ChessboardPiece
                            key={`${i}-${j}`}
                            className="chessboard_piece"
                            style={{backgroundColor: cellColor}}
                            piece={piece}
                        />
                    </div>
                )
            }
        }
        return chessboard;
    }


    return (
        <div>
            <div className="chessboard">
                {chessboardRender()}
            </div>
        </div>
    );
}