import React from "react";
import { ICard } from "../../../types/card";

interface IPagination {
  cards: ICard[];
  itemsPerPage: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({
  cards,
  itemsPerPage,
  handlePageChange,
  currentPage,
}: IPagination) {
  return (
    <section>
      <div className='flex gap-x-2 justify-center items-center rounded-lg text-lg bg-gray-300 py-1 md:px-20'>
        <p className='text-xl font-bold mr-2'>Strony: </p>
        <div className='my-2  bg-white py-2 px-4 rounded-lg flex gap-x-3  justify-center flex-wrap '>
          {Array.from(
            { length: Math.ceil(cards.length / itemsPerPage) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2  border rounded-full hover:scale-105 hover:font-bold  ${
                pageNumber === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pagination;
