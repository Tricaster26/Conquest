import { gameObject } from "@/pages/App";
import styles from "./GameDetails.module.css";

interface GameDetailsProps {
  element: gameObject;
}

/*Displays game details below title if dropdown button was clicked, goes back if clicked again*/
export default function GameDetails({ element }: GameDetailsProps) {
  var style = styles.goodScore;
  if (element.score < 80) {
    style = styles.avgScore;
    if (element.score < 50) {
      style = styles.problemScore;
    }
  }

  return element.details ? (
    <div
      className={styles.details}
      style={{
        backgroundImage: `url("https://media.rawg.io/media/games/923/923a5dd13b6e79dd23ab2d09934f0e8d.jpg")`,
      }}
    >
      <div className={styles.transition}>
        <span className={styles.meta}>
          MetaCritic : <span className={style}>{element.score}</span>{" "}
        </span>
        <span className={styles.date}>Release Date: {element.date}</span>
      </div>
    </div>
  ) : (
    false
  );
}
