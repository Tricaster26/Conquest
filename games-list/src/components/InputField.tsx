import styles from "./InputField.module.css";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
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
  emptyChecker: boolean;
}

export default function InputField({
  input,
  setInput,
  gamesList,
  setList,
  emptyChecker,
}: GameFieldProps) {
  const [added, setAdded] = useState(false);

  //lists game on webpage and calls function to upload game to mongoDB
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setList([...gamesList, input]);
    setInput({ game: "", complete: false, details: false });
    setAdded(true);
  }
  //Uploads data to mongo DB when game is added
  async function addData() {
    var path = "replaceData";
    if (emptyChecker) {
      //is length is 0 then no games are placed in a new Save. Else we just replace in existing save
      path = "saveData";
    }
    const response = await fetch("/api/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mongoList: gamesList }),
    });
    if (response.ok) {
      return console.log(response);
    } else {
      alert("ERROR!!");
    }
  }
  //used to prevent gamesList data being uploaded to DB before state is updated
  useEffect(() => {
    if (added) {
      addData();
      setAdded(false);
    }
  }, [added]);

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
        <button className={styles.button}>Add ⚔</button>
      </form>
    </div>
  );
}
