import Link from "next/link";
import styles from "./OneGame.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
/*Display for each game title , excluding the details*/

interface OneGameProps {
  gameObject: { game: string; complete: boolean; details: boolean };
  gamesList: Array<{ game: string; complete: boolean; details: boolean }>;
  setList: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }[]>
  >;
  setModal: Dispatch<
    SetStateAction<{
      gameName: { game: string; complete: boolean; details: boolean };
      open: boolean;
    }>
  >;
}

interface oneGameElement {
  game: string;
  complete: boolean;
  details: boolean;
}
/* This component signifies details related to any one game added and its components and modal */
export default function OneGame({
  gameObject,
  gamesList,
  setList,
  setModal,
}: OneGameProps) {
  const [clicked, setClicked] = useState(false); //checks if game component is clicked
  let getName = (complete: boolean) =>
    complete ? styles.striked : styles.unstriked; // variable to changle css style used on text when clicked
  let gamePic =
    "https://media.rawg.io/media/games/1c3/1c305096502c475c00276c827f0fd697.jpg";

  function closeObject(gameObject: oneGameElement) {
    //removes element from list of games when 'x' button is clicked
    setModal({ gameName: gameObject, open: true });
  }
  function completeCheck(element: oneGameElement) {
    //changes complete status of element object to true when component is clicked
    setList(
      gamesList.map((game) =>
        game === element ? { ...game, complete: !element.complete } : game
      )
    );
    setClicked(true);
  }
  function revealDetails(gameObject: oneGameElement) {
    //changes details status of element to false when v button is clicked
    setList(
      gamesList.map((game) =>
        game === gameObject ? { ...game, details: !gameObject.details } : game
      )
    );
  }

  //Uploads data to mongo DB when game is added
  async function uploadStriked() {
    const response = await fetch("/api/replaceData", {
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
    if (clicked) {
      uploadStriked();
      setClicked(false);
    }
  }, [clicked]);

  return (
    //A single game added to the list of games
    <div
      className={styles.box}
      style={{
        backgroundImage: `url(${gamePic}
    )`,
      }}
    >
      <div className={styles.innerBox}>
        <span
          onClick={() => completeCheck(gameObject)}
          className={getName(gameObject.complete)} //style changes depending on complete status (strikethrough)
        >
          {gameObject.game /* name of game to conquer */}
        </span>
        <button
          onClick={() => revealDetails(gameObject)}
          className={styles.reveal}
        >
          v
        </button>
        <button
          onClick={() => closeObject(gameObject)}
          className={styles.delete}
        >
          x
        </button>
        <Link //takes us to new page which describes the game
          href={{
            pathname: "/GameDescription",
            query: { gameName: gameObject.game },
          }}
        >
          <button className={styles.newPage}>↗</button>
        </Link>
      </div>
    </div>
  );
}
