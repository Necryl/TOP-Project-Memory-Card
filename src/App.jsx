import "./App.css";
import Card from "./Card.jsx";

function App() {
  function renderCards() {
    let result = [];
    for (let i = 0; i < 10; i++) {
      console.log(i);
      result.push(<Card key={i}>Card {i + 1}</Card>);
    }
    console.log(result);
    return result;
  }
  return (
    <div id="app">
      <div className="nav">
        <h1>Memory Game</h1>
        <div className="scores">
          <h3 className="score">Score:</h3>
          <h3 className="highScore">Highest Score:</h3>
        </div>
      </div>
      <div className="board">{renderCards()}</div>
    </div>
  );
}

export default App;
