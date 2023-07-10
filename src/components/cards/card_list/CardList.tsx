import React from "react";
import { ICard } from "../../types/card";
import Card from "./Card";
import Pagination from "./Pagination";

interface ICardList {
  cards: ICard[];
  itemsPerPage: number;
}

function CardList({ cards, itemsPerPage }: ICardList) {
  const [currentPage, setCurrentPage] = React.useState(1);
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
        {paginatedCards().map((item) => (
          <Card key={item._id} card={item} />
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
