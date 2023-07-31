import React from "react";
import { ICard } from "../../../types/card";
import { BAGROUNDS, FONTCOLOR } from "../../../utils/constants/colors";

interface IPagination {
  cards: ICard[];
  itemsPerPage: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
  top: boolean;
}

function Pagination({
  cards,
  itemsPerPage,
  handlePageChange,
  currentPage,
  top,
}: IPagination) {
  return (
    <section>
      <div
        className={`flex flex-col gap-x-2 justify-center items-center ${
          top ? "rounded-t-lg" : "rounded-b-lg"
        } py-2 md:px-4 ${BAGROUNDS.SECONDARY}`}
      >
        <p className='text-lg font-bold'>Strony</p>
        <div
          className={`py-2 px-4 rounded-lg flex gap-3  justify-center flex-wrap ${BAGROUNDS.PASSIVE}`}
        >
          {Array.from(
            { length: Math.ceil(cards.length / itemsPerPage) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type='button'
              className={`px-4 py-2 rounded-lg   ${
                pageNumber === currentPage
                  ? `${BAGROUNDS.ACTIVE} ${FONTCOLOR.ACTIVE}`
                  : `border hover:scale-105 hover:${BAGROUNDS.ACTIVE_BORDER} transition-transform`
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
