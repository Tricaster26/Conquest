import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "./InputField";
import AllGames from "./AllGames";
import { listObject } from "@/pages/App";

/*Holds code for input field and all games added by a user placed in gamesList*/
interface GameFieldProps {
  input: listObject;
  setInput: (input: listObject) => void;
  gamesList: Array<listObject>;
  setList: (gamesList: listObject[]) => void;
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
      alert("Error in receiving list of saved game data");
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <InputField
        input={input}
        setInput={(value: listObject) => {
          setInput(value);
        }}
        setList={(value: listObject[]) => {
          setList(value);
        }}
        gamesList={gamesList}
        emptyChecker={emptyChecker}
      />
      <AllGames
        gamesList={gamesList}
        setList={(value: listObject[]) => {
          setList(value);
        }}
      />
    </div>
  );
}
