import React from "react";
import { ICard } from "../../../types/card";
import Modal from "./Modal";
import Spinner from "../spinner/Spinner";
import {
  MODAL_BUTTON,
  MODAL_IMG,
} from "../../../utils/constants/modal_classes";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";

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
  const [isImage, setIsImage] = React.useState(false);
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

  React.useEffect(() => {
    const img = new Image();
    img.src = card.image_slug;
    img.onload = () => {
      setIsImage(true);
    };
  }, [card.image_slug]);
  return (
    <div
      key={card._id}
      className='p-4 bg-gray-300  border rounded-lg flex flex-col justify-center items-center'
    >
      {!isImage ? (
        <Spinner />
      ) : (
        <img
          className='cursor-pointer'
          onClick={expandClickHandler}
          src={card.image_slug}
          alt={card.title}
          width={800}
        />
      )}
      <div className='flex justify-between basis-full'>
        <div className='flex flex-col gap-y-2 text-sm py-4'>
          <div className=' py-1 px-2 rounded-lg'>
            <span>Nazwa: </span>
            <span className='font-bold'>
              {capitalizeFirstLetterInEveryWord(card.title)}
            </span>
          </div>
          <div className=' py-1 px-2 rounded-lg'>
            <span>Temat: </span>
            <span className='font-bold'>
              {capitalizeFirstLetterInEveryWord(card.theme.title)}
            </span>
          </div>
        </div>
        <div className='flex items-center text-white '>
          <button
            className='px-4 py-2 rounded-lg bg-blue-700 uppercase hover:scale-y-110 hover:font-bold transition-transform'
            onClick={expandClickHandler}
          >
            Powienksz zdjencie
          </button>
        </div>
      </div>

      {isModal && <Modal card={card} expandClickHandler={expandClickHandler} />}
    </div>
  );
}

export default Card;
