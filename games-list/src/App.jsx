import Header from "./components/Header";
import GamesCompleted from "./components/GamesCompleted";
import "./App.module.css";
import { useState } from "react";
import CountGames from "./components/CountGames";
import SideBar from "./components/SideBar";

function App() {
  const [input, setInput] = useState({
    game: "",
    complete: false,
    details: false,
  });
  const [gamesList, setList] = useState([]);
  return (
    <div className="App">
      <Header />
      <GamesCompleted
        input={input}
        setInput={setInput}
        gamesList={gamesList}
        setList={setList}
      />
      <CountGames gamesList={gamesList} />
      {/*<SideBar />*/}
    </div>
  );
}

export default App;
