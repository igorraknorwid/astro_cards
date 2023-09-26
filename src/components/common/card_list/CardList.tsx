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
    const arr = [...cards]
      .sort((a, b) => a.theme2[0].title.localeCompare(b.theme2[0].title))
      .map((item, i) => ({ ...item, num: i + 1 }));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return arr.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className='bg-slate-100'>
      <Pagination
        cards={cards}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        top={true}
      />
      <ul className='flex flex-col gap-y-4 my-4 px-2'>
        {paginatedCards(cards).map((item) => (
          <li
            key={item._id}
            className='flex gap-x-2 items-center justify-center'
          >
            <div className='text-[10px] md:text-xl'>{item.num}.</div>
            <Card card={item} />
          </li>
        ))}
      </ul>
      <Pagination
        cards={cards}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        top={false}
      />
    </section>
  );
}

export default CardList;
