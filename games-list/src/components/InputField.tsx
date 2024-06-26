import { listObject } from "@/pages/App";
import styles from "./InputField.module.css";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
/* Holds form allowing user to input their games and submit */

interface GameFieldProps {
  input: listObject;
  setInput: (input: listObject) => void;
  gamesList: Array<listObject>;
  setList: (gamesList: listObject[]) => void;
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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    var rawgData = await fetchData(input.game);
    setList([
      ...gamesList,
      { ...input, score: rawgData.metacritic, date: rawgData.released },
    ]);
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
    if (!response.ok) {
      console.error("Error in uploading data");
    }
  }
  //fethches list of possible games from RAWG of queried submitted game
  async function fetchData(game: string) {
    const response = await fetch(
      "https://api.rawg.io/api/games?search=" +
        game +
        "&key=" +
        process.env.NEXT_PUBLIC_RAWG_KEY
    );
    if (response.ok) {
      return await response.json().then((search) => search.results[0]);
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
            setInput({
              ...input,
              game: e.target.value,
              complete: false,
              details: false,
            })
          }
          placeholder="Conquer a game ..."
          className={styles.input}
        />
        <button className={styles.button}>Add ⚔</button>
      </form>
    </div>
  );
}
