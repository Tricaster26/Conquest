import OneGame from "./OneGame";
import styles from "./AllGames.module.css";
import GameDetails from "./GameDetails";
import { Dispatch, SetStateAction, useState } from "react";
import CloseModal from "./CloseModal";

interface AllGamesProps {
  gamesList: Array<{ game: string; complete: boolean; details: boolean }>;
  setList: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }[]>
  >;
}

/* Displays list of all games enter by the user, excluding those delated later on by the x button */

export default function AllGames({ gamesList, setList }: AllGamesProps) {
  let x = 0;
  const sortedList = gamesList
    .slice()
    .sort((a, b) => Number(a.complete) - Number(b.complete));
  const [modal, setModal] = useState({
    gameName: { game: "", complete: false, details: false },
    open: false,
  }); //Determines if modal prompt appears

  return (
    <div className={styles.container}>
      {sortedList.map(
        (
          gameObject //Every game element which exists within sortedList
        ) => (
          <h3 key={x++}>
            <OneGame
              gamesList={gamesList}
              setList={setList}
              gameObject={gameObject}
              setModal={setModal}
            />
            <GameDetails gamesList={gamesList} element={gameObject} />
            {/*Modal message for user opens whenc close button is clicked*/}
          </h3>
        )
      )}
      {modal.open && (
        <CloseModal
          setModal={setModal}
          modal={modal}
          gamesList={gamesList}
          setList={setList}
        />
      )}
    </div>
  );
}
