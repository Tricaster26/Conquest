import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [removed, setRemoved] = useState(false);

  // function removes pop up prompt as well as component clicked on
  function handleClick(gameObject: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    setList(gamesList.filter((list) => list !== gameObject));
    setRemoved(true);
  }

  async function removeData() {
    const response = await fetch("/api/replaceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mongoList: gamesList }),
    });
    if (response.ok) {
      return console.log(response);
    } else {
      alert("ERROR!!");
    }
  }
  //useEffect allows us to capture state right after it is set
  useEffect(() => {
    if (removed) {
      removeData();
      setRemoved(false);
      /*setModal is called here instead of in the handleClick function, as it prevents the useEffect call from triggering if setModal
      "open:false" is set outside of the useEffect hook */
      setModal({ ...modal, open: false });
    }
  }, [removed]);

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
            onClick={() => {
              handleClick(modal.gameName);
            }}
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
