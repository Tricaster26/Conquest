import styles from "./Header.module.css";

interface HeaderInterface {
  gameName: { game: string; complete: boolean; details: boolean };
}

export default function HeaderDesc({ gameName }: HeaderInterface) {
  return (
    <div>
      <h1 className={styles.header}>{gameName.game}</h1>
    </div>
  );
}
