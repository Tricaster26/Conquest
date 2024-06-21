import { Dispatch, SetStateAction } from "react";
import styles from "./CloseModal.module.css";

interface gameName {
  modal: {
    gameName: { game: string; complete: boolean; details: boolean };
    open: boolean;
  };
  setModal: Dispatch<
    SetStateAction<{
      gameName: { game: string; complete: boolean; details: boolean };
      open: boolean;
    }>
  >;
  gamesList: Array<{ game: string; complete: boolean; details: boolean }>;
  setList: Dispatch<
    SetStateAction<{ game: string; complete: boolean; details: boolean }[]>
  >;
}

export default function CloseModal({
  gamesList,
  setModal,
  modal,
  setList,
}: gameName) {
  // function removes pop up promp as well as component clicked on
  function handleClick(gameObject: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    setList(gamesList.filter((list) => list !== gameObject));
    setModal({ ...modal, open: false });
  }
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h1>
            Are you sure you want to remove "{modal.gameName.game}" from
            Conquest?
          </h1>
        </div>
        <div className={styles.message}>
          <p>
            By clicking confirm you will be removing "{modal.gameName.game}"
            from conquest.
            <br /> Click cancel to go back.
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.confirm}
            onClick={() => handleClick(modal.gameName)}
          >
            Confirm
          </button>
          <button
            className={styles.cancel}
            // close modal if "Cancel" is selected
            onClick={() => setModal({ ...modal, open: false })}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
