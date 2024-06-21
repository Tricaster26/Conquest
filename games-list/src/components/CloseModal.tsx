import { Dispatch, SetStateAction } from "react";

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
  function handleClick(gameObject: {
    game: string;
    complete: boolean;
    details: boolean;
  }) {
    setList(gamesList.filter((list) => list !== gameObject));
    setModal({ ...modal, open: false });
  }
  return (
    <div className="outer">
      <div className="inner">
        <div className="title">
          <h1>Are you sure you want to remove this game from Conquest?</h1>
        </div>
        <div className="message">
          <p>
            By clicking confirm you will be removing {modal.gameName.game} from
            conquest. Click cancel to go back.
          </p>
        </div>
        <div className="confirm">
          <button
            className="confirm"
            onClick={() => handleClick(modal.gameName)}
          >
            Confirm
          </button>
          <button
            className="cancel"
            onClick={() => setModal({ ...modal, open: false })}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
