import OneGame from "./OneGame";
import styles from "./AllGames.module.css";
import GameDetails from "./GameDetails";
import { useState } from "react";
import CloseModal from "./CloseModal";
import { gameObject } from "@/pages/App";

interface AllGamesProps {
  gamesList: Array<gameObject>;
  setList: (gamesList: gameObject[]) => void;
}

/* Displays list of all games enter by the user, excluding those delated later on by the x button */

export default function AllGames({ gamesList, setList }: AllGamesProps) {
  let x = 0;
  const sortedList = gamesList
    .slice()
    .sort((a, b) => Number(a.complete) - Number(b.complete));
  const [openModal, setOpenModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    game: "",
    complete: false,
    details: false,
    score: 0,
    date: "",
  });
  return (
    <div className={styles.container}>
      {sortedList.map((gameObject) => (
        <h3 key={x++}>
          <OneGame
            gamesList={gamesList}
            setList={(value: gameObject[]) => {
              setList(value);
            }}
            gameObject={gameObject}
            setOpenModal={(value: boolean) => {
              setOpenModal(value);
            }}
            setModalDetails={(value: gameObject) => setModalDetails(value)}
          />
          <GameDetails element={gameObject} />
          {/*Modal message for user opens when close button is clicked*/}
        </h3>
      ))}
      {openModal && (
        <CloseModal
          setOpenModal={(value: boolean) => {
            setOpenModal(value);
          }}
          modalDetails={modalDetails}
          gamesList={gamesList}
          setList={(value: gameObject[]) => {
            setList(value);
          }}
        />
      )}
    </div>
  );
}
