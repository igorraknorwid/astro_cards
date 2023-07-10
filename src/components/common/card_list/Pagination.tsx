import React from "react";
import { ICard } from "../../types/card";

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
      <div>
        {Array.from(
          { length: Math.ceil(cards.length / itemsPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${
              pageNumber === currentPage ? "font-bold" : "font-light"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Pagination;
