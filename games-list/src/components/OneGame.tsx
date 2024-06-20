import styles from "./OneGame.module.css";
import { Dispatch, SetStateAction } from "react";
/*Display for each game title , excluding the details*/

interface OneGameProps {
  element: { game: string; complete: boolean; details: boolean };
  gamesList: Array<{ game: string; complete: boolean; details: boolean }>;
  setList: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }[]>
  >;
}

export default function OneGame({ element, gamesList, setList }: OneGameProps) {
  let getName = (complete: boolean) =>
    complete ? styles.striked : styles.unstriked; // variable to changle css style used on text when clicked
  let query = `search=${element}`;
  let gamePic =
    "https://media.rawg.io/media/games/1c3/1c305096502c475c00276c827f0fd697.jpg";

  function handleClick(element: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    //removes element from list of games
    setList(gamesList.filter((list) => list !== element));
  }
  function completeCheck(element: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    //changes complete status of element object to true when x button is clicked
    setList(
      gamesList.map((game) =>
        game === element ? { ...game, complete: !element.complete } : game
      )
    );
  }
  function revealDetails(element: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    //changes details status of element to false when v button is clicked
    setList(
      gamesList.map((game) =>
        game === element ? { ...game, details: !element.details } : game
      )
    );
  }
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
          onClick={() => completeCheck(element)}
          className={getName(element.complete)} //style changes depending on complete status (strikethrough)
        >
          {element.game /* name of game to conquer */}
        </span>
        <button
          onClick={() => revealDetails(element)}
          className={styles.reveal}
        >
          v
        </button>
        <button onClick={() => handleClick(element)} className={styles.delete}>
          x
        </button>
      </div>
    </div>
  );
}
