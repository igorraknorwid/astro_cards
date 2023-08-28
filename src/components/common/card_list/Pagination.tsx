import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ICard } from "../../../types/card";
import { BAGROUNDS } from "../../../utils/constants/colors";
import NavTitle from "../nav_title/NavTitle";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IPagination {
  cards: ICard[];
  itemsPerPage: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
  top: boolean;
}

function MyPagination({
  cards,
  itemsPerPage,
  handlePageChange,
  currentPage,
  top,
}: IPagination) {
  const length = Math.ceil(cards.length / itemsPerPage);
  return (
    <section>
      <div
        className={`flex flex-col gap-x-2 justify-center items-center ${
          top ? "rounded-t-lg" : "rounded-b-lg"
        } py-2 md:px-4 ${BAGROUNDS.SECONDARY}`}
      >
        <NavTitle title='Strony:' />
        <div>
          <Stack
            spacing={2}
            bgcolor={"white"}
            padding={1}
            className='rounded-lg'
          >
            <Pagination
              count={length}
              page={currentPage}
              boundaryCount={2}
              variant='outlined'
              color='primary'
              size='large'
              onChange={(_, num) => handlePageChange(num)}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </div>
    </section>
  );
}

export default MyPagination;
