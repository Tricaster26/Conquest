import OneGame from "./OneGame";
import styles from "./AllGames.module.css";
import GameDetails from "./GameDetails";

/* Displays list of all games enter by the user, excluding those delated later on by the x button */

export default function AllGames({ gamesList, setList }) {
  let x = 0;
  const sortedList = gamesList
    .slice()
    .sort((a, b) => Number(a.complete) - Number(b.complete));

  return (
    <div className={styles.container}>
      {sortedList.map(
        (
          element //Every game element exists within sortedList
        ) => (
          <h3 key={x++}>
            <OneGame
              gamesList={gamesList}
              setList={setList}
              element={element}
            />
            <GameDetails gamesList={gamesList} element={element} />
          </h3>
        )
      )}
    </div>
  );
}
