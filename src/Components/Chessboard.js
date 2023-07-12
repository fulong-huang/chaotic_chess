import './Chessboard.css';

export default function Chessboard() {

    const chessboardRender = () => {
        const chessboard = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const cellColor = (i + j) % 2 === 0 ? 'dodgerblue' : '#363457';
                chessboard.push(
                    <div
                        key={`${i}${j}`}
                        className="chessboard_cell"
                        style={{backgroundColor: cellColor}}
                    />
                )
            }
        }
        return chessboard;
    }

    return (
        <div>
            <div className="chessboard">
                {/* <div> HELLO WORLD PENIS </div> */}
                {chessboardRender()}
            </div>
        </div>
    );
}