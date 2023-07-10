import React from "react";
import { ICard } from "../../types/card";

interface ICardCounter {
  cards: ICard[];
}

function CardCounter({ cards }: ICardCounter) {
  function setKartki(total: number) {
    if (total < 2) return "kartka";
    if (total > 2 && total < 5) return "kartki";
    if (total > 4) return "kartkek";
  }
  return (
    <>
      {cards && (
        <div>
          {cards.length} {setKartki(cards.length)}
        </div>
      )}
    </>
  );
}
export default CardCounter;
