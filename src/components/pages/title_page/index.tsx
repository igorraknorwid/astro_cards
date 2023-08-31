import React from "react";
import { ICard } from "../../../types/card";
import client from "../../../api/sanityClient";
import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import CategoryFilter from "../../filters/CategoryFilter";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";

function CardsByTitle() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [year, setYear] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  const setDataFilter = (value: string | null) => {
    setFilter(value);
  };
  const filteredData = data?.filter((item) => {
    if (filter === null) {
      return true;
    } else {
      return item.theme.title === filter;
    }
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const year = queryParams.get("rok");
        setYear(year);
        const title = queryParams.get("nazwa");
        setTitle(title);
        const query = `*[_type == 'card' && '${year}' in years[]->title && title == '${title}']{ _id, title,years[]->{title},image_slug,theme->{title},
      }`;
        const result = await client.fetch<ICard[]>(query);
        console.log(result);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, [year, title]);

  if (!data)
    return (
      <div className='mx-2 md:mx-[10%] flex justify-center items-center mt-[10%]'>
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className='mx-2 md:mx-[10%] flex justify-center items-center mt-[10%]'>
        Error fetching data from Sanity!
      </div>
    );

  console.log("data", data);
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <p className='text-center text-lg'>
        Nazwa:
        <span className='ml-2 font-bold'>
          {capitalizeFirstLetterInEveryWord(title)}
        </span>
      </p>
      <CardCounter cards={data} />
      <div className='flex flex-col md:flex-row md:gap-x-4 my-4'>
        <div className='basis-2/3 border rounded-lg'>
          {data && (
            <CardList
              cards={data}
              itemsPerPage={5}
              currentPage={currentPage}
              setCurrentPage={currentPageHandler}
            />
          )}
        </div>
        <div className='basis-1/3 flex flex-col gap-4'>
          <CategoryFilter cards={data} dataHandler={setDataFilter} />
        </div>
      </div>
    </div>
  );
}

export default CardsByTitle;
