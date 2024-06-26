import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CloseModal.module.css";
import { listObject } from "@/pages/App";

interface gameName {
  gamesList: Array<listObject>;
  setList: (gamesList: listObject[]) => void;
  modalDetails: listObject;
  setOpenModal: (modal: boolean) => void;
}

export default function CloseModal({
  gamesList,
  modalDetails,
  setOpenModal,
  setList,
}: gameName) {
  const [removed, setRemoved] = useState(false);

  // function removes pop up prompt as well as component clicked on
  function handleRemoval(game: string) {
    setList(gamesList.filter((element) => element.game !== game));
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
    if (!response.ok) {
      console.error("Error");
    }
  }
  //useEffect is placed here as it allows the list state to be saved when confirm is clicked and before modal is closed
  useEffect(() => {
    if (removed) {
      removeData();
      setRemoved(false);
      /*setModal is called here instead of in the handleClick function, as it prevents the useEffect call from triggering if setModal
      "open:false" is set outside of the useEffect hook */
      setOpenModal(false);
    }
  }, [removed]);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h1>
            Are you sure you want to remove "{modalDetails.game}" from Conquest?
          </h1>
        </div>
        <div className={styles.message}>
          <p>
            By clicking confirm you will be removing "{modalDetails.game}" from
            conquest.
            <br /> Click cancel to go back.
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.confirm}
            onClick={() => {
              handleRemoval(modalDetails.game);
            }}
          >
            Confirm
          </button>
          <button className={styles.cancel} onClick={() => setOpenModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
