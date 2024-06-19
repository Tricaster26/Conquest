import styles from "./InputField.module.css";
/* Holds form allowing user to input their games and submit */

export default function InputField({ input, setInput, setList, gamesList }) {
  function handleSubmit(e) {
    e.preventDefault();
    setList([...gamesList, input]);
    setInput({ game: "", complete: false });
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input
          type="text"
          value={input.game}
          onChange={(e) => setInput({ game: e.target.value, complete: false })}
          placeholder="Conquer a game ..."
          className={styles.input}
        />
        <button className={styles.button}>⚔</button>
      </form>
    </div>
  );
}
