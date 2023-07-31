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
      <div className='flex justify-end w-full '>
        <button
          className={`${MODAL_BUTTON} text-6xl m-8 text-white hover:scale-110 transition-transform absolute top-0`}
          type='button'
        >
          &#9587;
        </button>
      </div>
      <img className={MODAL_IMG} src={card.image_slug} alt={card.title} />
    </div>
  );
}

export default Modal;
