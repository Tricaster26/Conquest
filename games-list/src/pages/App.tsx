import { useEffect, useState } from "react";
import Header from "../components/Header";
import GamesCompleted from "../components/GamesCompleted";
import CountGames from "../components/CountGames";

interface listObject {
  game: string;
  complete: boolean;
  details: boolean;
  // Add more properties as needed
}

function App() {
  const [input, setInput] = useState({
    game: "",
    complete: false,
    details: false,
  });
  const [gamesList, setList] = useState<listObject[]>([]);

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
