import InputField from "./InputField";
import AllGames from "./AllGames";
import styles from "./GamesCompleted.module.css";

export default function GamesCompleted({
  input,
  setInput,
  gamesList,
  setList,
}) {
  return (
    <div className={styles.container}>
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
