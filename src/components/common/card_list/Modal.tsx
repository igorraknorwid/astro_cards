import React from "react";
import { ICard } from "../../../types/card";
import {
  MODAL_IMG,
  MODAL_BUTTON,
} from "../../../utils/constants/modal_classes";

interface IModal {
  card: ICard;
  expandClickHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function Modal({ card, expandClickHandler }: IModal) {
  return (
    <div
      onClick={(e) => {
        expandClickHandler(e);
      }}
      className='fixed top-0 bottom-0 right-0 left-0 bg-black/80 flex flex-col justify-center items-center'
    >
      <button className={`${MODAL_BUTTON} border`}>Close</button>
      <img
        className={MODAL_IMG}
        src={card.image_slug}
        alt={card.title}
        width={1000}
      />
    </div>
  );
}

export default Modal;
