import styles from "./InputField.module.css";
import { Dispatch, SetStateAction } from "react";
/* Holds form allowing user to input their games and submit */

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

export default function InputField({
  input,
  setInput,
  gamesList,
  setList,
}: GameFieldProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setList([...gamesList, input]);
    setInput({ game: "", complete: false, details: false });
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input
          type="text"
          value={input.game}
          onChange={(e) =>
            setInput({ game: e.target.value, complete: false, details: false })
          }
          placeholder="Conquer a game ..."
          className={styles.input}
        />
        <button className={styles.button}>⚔</button>
      </form>
    </div>
  );
}
