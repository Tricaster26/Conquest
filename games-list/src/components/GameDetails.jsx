import styles from "./GameDetails.module.css";

/*Displays game details below title if dropdown button was clicked, goes back if clicked again*/
export default function GameDetails({ gamesList, element }) {
  return element.details ? (
    <div
      className={styles.details}
      style={{
        backgroundImage: `url("https://media.rawg.io/media/games/923/923a5dd13b6e79dd23ab2d09934f0e8d.jpg")`,
      }}
    >
      <div className={styles.transition}>
        <span className={styles.meta}>MetaCritic Score: </span>
        <span className={styles.date}>Release Date:</span>
      </div>
    </div>
  ) : (
    false
  );
}
