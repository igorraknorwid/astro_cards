import React from "react";
import { ICard } from "../../types/card";

interface IModal {
  card: ICard;
  expandClickHandler: () => void;
  isModal: boolean;
}

function Modal({ card, expandClickHandler, isModal }: IModal) {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-black/80 flex flex-col justify-center items-center'>
      <button className='border' onClick={expandClickHandler}>
        Close
      </button>
      <img src={card.image_slug} alt={card.title} width={1000} />
    </div>
  );
}

export default Modal;
