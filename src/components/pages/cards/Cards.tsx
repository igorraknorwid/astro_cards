import React from "react";
import client from "../../../api/sanityClient";

import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import CategoryNavigation from "../../navigation/CategoryNavigation";
import TitleNavigation from "../../navigation/TitleNavigation";

import { ICard, ICardData } from "../../../types/card";

import { groq_params } from "../../../api/groq/groq";
// import Breadcrumbs from "../../breadcrumbs/Breadcrumbs";

function Cards() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const year = queryParams.get("rok");
        setYear(year);
        const query = `*[_type == "card" && '${year}' in years[]->title]{${groq_params.cards_groq_params}}`;
        const fetchedData = await client.fetch<ICardData[]>(query);
        const filteredResults = fetchedData.filter(
          (item) =>
            item._id &&
            item.theme2 &&
            item.title &&
            item.years &&
            item.image_slug
        );

        setData(
          filteredResults.map((item) => {
            return {
              ...item,
              years: item.years
                .map((item) => item.title)
                .sort((a, b) => a.localeCompare(b)),
            };
          })
        );
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, []);

  if (!data)
    return (
      <div className='mx-2 md:mx-[10%] flex justify-center items-center mt-[10%]'>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='mx-2 md:mx-[5%]'>
      <YearTitle year={year} />
      <CardCounter cards={data} />
      <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-4 my-4'>
        <div className='basis-2/3 border rounded-lg'>
          <CardList
            cards={data}
            itemsPerPage={5}
            currentPage={currentPage}
            setCurrentPage={currentPageHandler}
          />
        </div>
        <div className='basis-1/3 flex flex-col gap-y-4'>
          <CategoryNavigation cards={data} year={year} />
          <TitleNavigation cards={data} year={year} />
        </div>
      </div>
    </div>
  );
}

export default Cards;
