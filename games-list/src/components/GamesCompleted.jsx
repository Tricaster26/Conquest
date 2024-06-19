import InputField from "./InputField";
import AllGames from "./AllGames";

/*Holds code for input field and all games added by a user placed in gamesList*/

export default function GamesCompleted({
  input,
  setInput,
  gamesList,
  setList,
}) {
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
