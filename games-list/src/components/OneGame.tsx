import styles from "./OneGame.module.css";
import { Dispatch, SetStateAction } from "react";
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

export default function OneGame({
  gameObject,
  gamesList,
  setList,
  setModal,
}: OneGameProps) {
  let getName = (complete: boolean) =>
    complete ? styles.striked : styles.unstriked; // variable to changle css style used on text when clicked
  let query = `search=${gameObject}`;
  let gamePic =
    "https://media.rawg.io/media/games/1c3/1c305096502c475c00276c827f0fd697.jpg";

  function handleClick(gameObject: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    //removes element from list of games
    setModal({ gameName: gameObject, open: true });
  }
  function completeCheck(element: oneGameElement) {
    //changes complete status of element object to true when x button is clicked
    setList(
      gamesList.map((game) =>
        game === element ? { ...game, complete: !element.complete } : game
      )
    );
  }
  function revealDetails(gameObject: oneGameElement) {
    //changes details status of element to false when v button is clicked
    setList(
      gamesList.map((game) =>
        game === gameObject ? { ...game, details: !gameObject.details } : game
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
          onClick={() => handleClick(gameObject)}
          className={styles.delete}
        >
          x
        </button>
      </div>
    </div>
  );
}
