import React from "react";
import { ICard } from "../../../types/card";
import Card from "./Card";
import Pagination from "./Pagination";

interface ICardList {
  cards: ICard[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

function CardList({
  cards,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: ICardList) {
  const paginatedCards = (cards: ICard[]) => {
    const arr = [...cards].map((item, i) => ({ ...item, num: i + 1 }));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return arr.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section>
      <Pagination
        cards={cards}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
      <ul className='flex flex-col gap-y-2 my-4'>
        {paginatedCards(cards).map((item) => (
          <div
            key={item._id}
            className='flex gap-x-2 items-center justify-center'
          >
            <div className='text-xl'>{item.num}.</div>
            <Card card={item} />
          </div>
        ))}
      </ul>
      <Pagination
        cards={cards}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
}

export default CardList;
