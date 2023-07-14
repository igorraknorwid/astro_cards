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
  const paginatedCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cards.slice(startIndex, endIndex);
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
      <ul>
        {paginatedCards().map((item, i) => (
          <div className='flex gap-x-2 items-center'>
            <div className='text-xl'>{i + 1}.</div>
            <Card key={item._id} card={item} />
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
