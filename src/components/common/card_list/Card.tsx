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
    <li key={card._id} className='p-4 bg-gray-300 text-white border rounded-lg'>
      <img src={card.image_slug} alt={card.title} width={800} />
      <div className='flex gap-x-2 text-lg py-4'>
        <div className='bg-blue-600 py-2 px-4 rounded-lg'>{card.title}</div>
        <div className='bg-blue-600 py-2 px-4 rounded-lg'>
          {card.theme.title}
        </div>
        <button onClick={expandClickHandler}>Expand</button>
      </div>

      {isModal && <Modal card={card} expandClickHandler={expandClickHandler} />}
    </li>
  );
}

export default Card;
