import "./App.css";
import Card from "./Card.jsx";
import { useState, useRef } from "react";

function App() {
  const [score, setScore] = useState(0);
  const highScore = useRef(0);
  const memory = useRef([]);
  if (score > highScore.current) {
    highScore.current = score;
  }
  function renderCards() {
    let result = [];
    for (let i = 0; i < 10; i++) {
      result.push(
        <Card index={i} key={i} clicked={cardClicked}>
          Card {i + 1}
        </Card>
      );
    }
    return result;
  }
  function cardClicked(index) {
    if (!memory.current.includes(index)) {
      memory.current = [...memory.current, index];
      setScore((score) => score + 1);
    } else {
      setScore(0);
      memory.current = [];
    }
  }
  return (
    <div id="app">
      <div className="nav">
        <h1>Memory Game</h1>
        <div className="scores">
          <h3 className="score">Score: {score}</h3>
          <h3 className="highScore">Best Score: {highScore.current}</h3>
        </div>
      </div>
      <p>
        Click on each card <i>no more than once</i> to win the game!
      </p>
      <div className="board">{renderCards()}</div>
    </div>
  );
}

export default App;
