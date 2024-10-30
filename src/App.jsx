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
    <>
      <h1>Memory Game</h1>
      <div className="board">{renderCards()}</div>
    </>
  );
}

export default App;
