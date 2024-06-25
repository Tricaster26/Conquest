import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "./InputField";
import AllGames from "./AllGames";
/*Holds code for input field and all games added by a user placed in gamesList*/

interface GameFieldProps {
  input: { game: string; complete: boolean; details: boolean };
  setInput: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }>
  >;
  gamesList: Array<{ game: string; complete: boolean; details: boolean }>;
  setList: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }[]>
  >;
}

export default function GamesCompleted({
  input,
  setInput,
  gamesList,
  setList,
}: GameFieldProps) {
  const [emptyChecker, setChecker] = useState(true); // checks if mongoDB collection returned an empty list

  // receives data from mongoDB and sets gamesList if it exists in DB
  async function getData() {
    const response = await fetch("/api/getData", {});
    if (response.ok) {
      const mongoData = await response.json();
      if (mongoData[0] !== undefined) {
        setList(mongoData[0].mongoList); //holds previously saved data
        setChecker(false); // gamesList exists in DB
      }
    } else {
      alert("ERROR!!");
    }
  }
  //used to load data from mongoDB once on page load
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <InputField
        input={input}
        setInput={setInput}
        setList={setList}
        gamesList={gamesList}
        emptyChecker={emptyChecker}
      />
      <AllGames gamesList={gamesList} setList={setList} />
    </div>
  );
}
