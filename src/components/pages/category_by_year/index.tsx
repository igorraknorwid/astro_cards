import React from "react";
import { ICard } from "../../../types/card";
import client from "../../../api/sanityClient";
import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import TitleFilter from "../../filters/TitleFilter";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";

function CardsByCategory() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<string | null>(null);
  const [subCategory, setSubCategory] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  const setDataFilter = (value: string | null) => {
    setFilter(value);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const year = queryParams.get("rok");
        setYear(year);
        const category = queryParams.get("temat");
        setCategory(category);
        const subcategory = queryParams.get("subtemat");
        setSubCategory(subcategory);
        console.log(subcategory);
        const query = `*[_type == 'card' && '${year}' in years[]->title && theme->title == "${category}"]{ _id,years[]->{title},title,image_slug,theme->{title},
      }`;
        const queryWithSubcategory = `*[_type == 'card' && '${year}' in years[]->title && theme->title == "${category}" && subtheme->title == "${subcategory}" ]{ _id, title,image_slug,theme->{title}}`;
        const result = await client.fetch<ICard[]>(
          subcategory ? queryWithSubcategory : query
        );
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data?.filter((item) => {
    if (filter === null) {
      return true;
    } else {
      return item.title === filter;
    }
  });

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

  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <div className='flex gap-x-2 justify-center text-lg'>
        <p>
          Temat:
          <span className='font-bold'>
            {capitalizeFirstLetterInEveryWord(category)}
          </span>
        </p>
        {subCategory && (
          <p>
            Temat dodatkowy:<span className='font-bold'>{subCategory}</span>
          </p>
        )}
      </div>

      <CardCounter cards={filteredData} />
      <div className='flex flex-col md:flex-row md:gap-x-4 my-4'>
        <div className='basis-2/3 border rounded-lg'>
          {filteredData && (
            <CardList
              cards={filteredData}
              itemsPerPage={5}
              currentPage={currentPage}
              setCurrentPage={currentPageHandler}
            />
          )}
        </div>
        <div className='basis-1/3 flex flex-col gap-4'>
          <TitleFilter cards={data} dataHandler={setDataFilter} />
        </div>
      </div>
    </div>
  );
}

export default CardsByCategory;
