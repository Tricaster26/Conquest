import styles from "./CountGames.module.css";

/*Used to count games completed and uncompleted*/

export default function CountGames({ gamesList }) {
  function toCompleted() {
    // checks for numeber of games entered that were completed
    return gamesList.filter((element) => !element.complete).length;
  }
  function complete() {
    return gamesList.filter((element) => element.complete).length;
  }
  return (
    <div className={styles.container}>
      <span className={styles.toCompleted}>
        Games to Conquer: {toCompleted()}
      </span>
      <span className={styles.completed}> Conquered Games: {complete()}</span>
    </div>
  );
}
