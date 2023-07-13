// import logo from './logo.svg';
import './App.css';
import ChessboardRenderer from './Components/ChessboardRenderer';
import RightHandMenu from './Components/RightHandMenu';


function App() {
  return (
    <div className="App" style={{ height: '100vh', overflow: 'auto', backgroundColor: '#282c34', display: "flex", justifyContent: "center"}}>
      <div style={{}}>
          <ChessboardRenderer />
      </div>
      <RightHandMenu />
    </div>
  );
}

export default App;
