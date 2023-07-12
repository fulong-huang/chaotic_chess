import logo from './logo.svg';
import './App.css';
import Chessboard from './Components/Chessboard';


function App() {
  return (
    <div className="App" style={{height: '100vh', backgroundColor:'#282c34'}}>
      <Chessboard/>
    </div>
  );
}

export default App;
