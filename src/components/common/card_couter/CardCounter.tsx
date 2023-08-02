import React from "react";
import { ICard } from "../../../types/card";

interface ICardCounter {
  cards: ICard[];
}

function CardCounter({ cards }: ICardCounter) {
  return (
    <>
      {cards && (
        <div className='text-center text-lg my-2'>
          Liczba kart: {cards.length}
        </div>
      )}
    </>
  );
}
export default CardCounter;
