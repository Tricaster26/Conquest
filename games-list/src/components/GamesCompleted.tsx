import { Dispatch, SetStateAction } from "react";
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
  return (
    <div>
      <InputField
        input={input}
        setInput={setInput}
        setList={setList}
        gamesList={gamesList}
      />
      <AllGames gamesList={gamesList} setList={setList} />
    </div>
  );
}
