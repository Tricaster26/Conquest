import { listObject } from "@/pages/App";
import styles from "./GameDetails.module.css";

interface GameDetailsProps {
  element: listObject;
}

/*Displays game details below title if dropdown button was clicked, goes back if clicked again*/
export default function GameDetails({ element }: GameDetailsProps) {
  return element.details ? (
    <div
      className={styles.details}
      style={{
        backgroundImage: `url("https://media.rawg.io/media/games/923/923a5dd13b6e79dd23ab2d09934f0e8d.jpg")`,
      }}
    >
      <div className={styles.transition}>
        <span className={styles.meta}>
          MetaCritic : <span className={styles.score}>{element.score}</span>{" "}
        </span>
        <span className={styles.date}>Release Date: {element.date}</span>
      </div>
    </div>
  ) : (
    false
  );
}
