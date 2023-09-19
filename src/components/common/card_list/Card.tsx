import React from "react";
import { ICard } from "../../../types/card";
import Modal from "./Modal";
import Spinner from "../spinner/Spinner";
import {
  MODAL_BUTTON,
  MODAL_IMG,
} from "../../../utils/constants/modal_classes";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";
import expand from "../../../utils/images/expand.png";

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
  const years = card.years?.slice().map((obj) => obj);
  // const themes_list = card.theme2?.slice().map((obj) => obj.title);
  return (
    <div
      key={card._id}
      className='p-4 bg-white hover:bg-slate-300 transition-transform   border rounded-lg '
    >
      <div className='flex flex-col justify-center items-center'>
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
      </div>
      <div className='flex justify-between basis-full'>
        <div className='flex flex-col gap-y-1 text-sm py-2'>
          <div className='py-1 px-2 rounded-lg'>
            <span>Nazwa: </span>
            <span className='font-bold'>
              {capitalizeFirstLetterInEveryWord(card.title)}
            </span>
          </div>
          <div className='py-1 px-2 rounded-lg'>
            <span>Temat: </span>
            <span className='font-bold'>
              {capitalizeFirstLetterInEveryWord(card.theme.title)}
            </span>
          </div>
          <div className='py-1 px-2 rounded-lg flex gap-x-1'>
            <p>{years.length > 1 ? "Lata:" : "Rok:"}</p>
            <div className='font-bold'>
              <ul className='flex gap-x-1'>
                {years.map((y, i) => (
                  <li key={i}>{y}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className='py-1 px-2 rounded-lg flex gap-x-1'>
            <p>{themes_list?.length > 1 ? "Tematy:" : "Temat:"}</p>
            <div className='font-bold'>
              <ul className='flex gap-x-1'>
                {themes_list?.map((y, i) => (
                  <li key={i}>{capitalizeFirstLetterInEveryWord(y)}</li>
                ))}
              </ul>
            </div>
          </div> */}
          {card.slug && (
            <div className=' py-1 px-2 rounded-lg'>
              <span>Nazwa: </span>
              <span className='font-bold'>
                <a href={card.slug}>Zródło</a>
              </span>
            </div>
          )}
        </div>
        <div className='flex items-center text-white '>
          <button
            className='px-4 py-2 rounded-lg  uppercase hover:scale-y-110 hover:font-bold transition-transform text-sm'
            onClick={expandClickHandler}
          >
            <img src={expand} width={32} height={32} alt='powienksz zdjęcie' />
          </button>
        </div>
      </div>

      {isModal && <Modal card={card} expandClickHandler={expandClickHandler} />}
    </div>
  );
}

export default Card;
