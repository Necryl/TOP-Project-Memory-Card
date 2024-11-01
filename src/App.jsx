import "./App.css";
import loadingGif from "/loading.gif";
import Card from "./Card.jsx";
import { useState, useRef, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const randomSort = () => Math.random() - 0.5;
const P = new Pokedex();
const pokeList = (async () => {
  let data = await P.getPokemonsList();
  let result = data.results.map((poke) => poke.name);
  return result;
})();
async function getRandomPokemonId() {
  const list = await pokeList;
  return Math.floor(Math.floor(Math.random() * list.length) + 1);
}
let tenRandomPokemon = (() => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: `loading image`,
      image: loadingGif,
      index: i,
    });
  }
  return data;
})();
async function getTenPokemon() {
  const pokemonIds = await (async () => {
    let output = [];
    while (output.length < 10) {
      let candidate = await getRandomPokemonId();
      if (!output.includes(candidate)) {
        output.push(candidate);
      }
    }
    return output;
  })();
  const pokemonData = await Promise.all(
    pokemonIds.map(async (id) => {
      let list = await pokeList;
      let pokeName = list[id];
      const poke = await P.getPokemonByName(pokeName);
      return {
        id: id,
        name: pokeName,
        image: poke.sprites.other["official-artwork"].front_default,
      };
    })
  ).then((results) => results);
  tenRandomPokemon = pokemonData;
  return pokemonData;
}

function App() {
  const [score, setScore] = useState(0);
  const highScore = useRef(0);
  const memory = useRef([]);
  const [data, setData] = useState(tenRandomPokemon);
  if (score > highScore.current) {
    highScore.current = score;
  }
  const loading = data[0].name === "loading image";
  useEffect(() => {
    if (loading) {
      getTenPokemon().then((results) => {
        setData(results);
      });
    }
  }, [loading]);
  function renderCards() {
    return data.sort(randomSort).map((cardData, i) => {
      return (
        <Card index={cardData.id} key={i} clicked={cardClicked}>
          <img src={cardData.image} alt={cardData.name} />
        </Card>
      );
    });
  }
  function cardClicked(index) {
    if (!loading) {
      if (!memory.current.includes(index)) {
        memory.current = [...memory.current, index];
        setScore((score) => score + 1);
      } else {
        setScore(0);
        memory.current = [];
      }
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
