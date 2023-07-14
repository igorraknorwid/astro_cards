import React from "react";
import { ICard } from "../../../types/card";
import Modal from "./Modal";
import {
  MODAL_BUTTON,
  MODAL_IMG,
} from "../../../utils/constants/modal_classes";

interface ICardComponent {
  card: ICard;
}

function setBodyScroll(isOpen: boolean) {
  const body = document.body;
  if (isOpen) {
    body.classList.add("overflow-hidden");
  } else {
    body.classList.remove("overflow-hidden");
  }
}

function Card({ card }: ICardComponent) {
  const [isModal, setIsModal] = React.useState(false);
  const expandClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const targetElement = e.target as Element;
    const elementClass = targetElement.classList[0];
    if (elementClass === MODAL_BUTTON) {
      setIsModal((s) => !s);
      return;
    }

    if (elementClass !== MODAL_IMG) {
      setIsModal((s) => !s);
    }
  };
  React.useEffect(() => {
    //set overflow
    setBodyScroll(isModal);
  }, [isModal]);
  return (
    <li
      key={card._id}
      className='p-4 bg-slate-900 text-white border md:w-1/2  '
    >
      <img src={card.image_slug} alt={card.title} width={300} />
      <div>
        {card.title}-{card.theme.title}
      </div>
      <button onClick={expandClickHandler}>Expand</button>
      {isModal && <Modal card={card} expandClickHandler={expandClickHandler} />}
    </li>
  );
}

export default Card;
