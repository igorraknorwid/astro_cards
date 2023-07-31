import React from "react";
import client from "../../../api/sanityClient";
import { ICard } from "../../../types/card";
import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import CategoryNavigation from "../../navigation/CategoryNavigation";
import TitleNavigation from "../../navigation/TitleNavigation";

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
        const query = `*[_type == "card" && '${year}' in years[]->title]{ _id,title,image_slug,theme->{title,_id},subtheme->{title,_id}
      }`;
        const result = await client.fetch<ICard[]>(query);
        setData(result);
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
      <CategoryNavigation cards={data} year={year} />
      <div className='flex flex-col md:flex-row md:gap-x-4 my-4'>
        <div className='basis-2/3'>
          <CardList
            cards={data}
            itemsPerPage={5}
            currentPage={currentPage}
            setCurrentPage={currentPageHandler}
          />
        </div>
        <div className='basis-1/3'>
          <TitleNavigation cards={data} year={year} />
        </div>
      </div>
    </div>
  );
}

export default Cards;
