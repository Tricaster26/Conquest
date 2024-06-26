import { useState } from "react";
import Header from "../components/Header";
import GamesCompleted from "../components/GamesCompleted";
import CountGames from "../components/CountGames";

export interface gameObject {
  game: string;
  complete: boolean;
  details: boolean;
  score: number;
  date: string;
  // Add more properties as needed
}

function App() {
  const [input, setInput] = useState({
    game: "",
    complete: false,
    details: false,
    score: 0,
    date: "",
  });
  const [gamesList, setList] = useState<gameObject[]>([]);

  return (
    <div className="App">
      <Header />
      <GamesCompleted
        input={input}
        setInput={(value: gameObject) => {
          setInput(value);
        }}
        gamesList={gamesList}
        setList={(value: gameObject[]) => {
          setList(value);
        }}
      />
      <CountGames gamesList={gamesList} />
      {/*<SideBar />*/}
    </div>
  );
}

export default App;
