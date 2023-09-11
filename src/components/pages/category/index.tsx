import React from "react";
import { ICard, ICardData } from "../../../types/card";
import client from "../../../api/sanityClient";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import TitleFilter from "../../filters/TitleFilter";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";

interface IFilter {
  title: string | null;
  year: string | null;
}

function AllFromCategory() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [filter, setFilter] = React.useState<IFilter>({
    title: null,
    year: null,
  });

  const [isError, setIsError] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string | null>(null);
  const [subCategory, setSubCategory] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [years, setYears] = React.useState<string[] | null>(null);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  const setDataFilter = (title: string | null, year: string | null) => {
    setFilter({ ...filter, title, year });
    setCurrentPage(1);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const category = queryParams.get("temat");
        setCategory(category);
        // const subcategory = queryParams.get("subtemat");
        // setSubCategory(subcategory);
        // console.log(subcategory);
        const query = `*[_type == 'card' && theme->title == "${category}"]{ _id, title,image_slug,years[]->{title},theme->{title},
      }`;
        // const queryWithSubcategory = `*[_type == 'card' && '${year}' in years[]->title && theme->title == "${category}" && subtheme->title == "${subcategory}" ]{ _id, title,image_slug,theme->{title}}`;
        const result = await client.fetch<ICardData[]>(
          // subcategory ? queryWithSubcategory : query
          query
        );
        if (result) {
          const yearsArr = result
            .map((item) => item.years.map((item) => item.title))
            .reduce((acc, item) => {
              item.forEach((value) => acc.push(value));
              return acc;
            });
          const yearsSet = Array.from(new Set(yearsArr));
          if (yearsSet.length > 0) {
            setYears(yearsSet);
          }
        }

        setData(
          result.map((item) => {
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

  const filteredData = data
    ?.filter((item) => {
      if (filter.title === null) {
        return true;
      } else {
        return item.title === filter.title;
      }
    })
    .filter((item) => {
      if (filter.year === null) {
        return true;
      } else {
        return item.years.includes(filter.year);
      }
    })

    .sort((a, b) => a.title.localeCompare(b.title));
  console.log(data);
  console.log(years);
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

          {years ? (
            <ul className='flex flex-col gap-y-2 text-xl border '>
              <li>
                <button
                  onClick={() => {
                    setFilter((filter) => {
                      return { ...filter, year: null };
                    });
                  }}
                  className={`${
                    filter.year === null ? "text-red-800" : "text-blue-500"
                  }`}
                >
                  Całość
                </button>
              </li>
              {years.map((year, i) => (
                <li key={i}>
                  <button
                    className={`${
                      year === filter.year ? "text-red-800" : "text-blue-500"
                    }`}
                    onClick={() => {
                      if (filter.year === year) {
                        setFilter((filter) => {
                          return { ...filter, year: null };
                        });
                      } else {
                        setFilter((filter) => {
                          return { ...filter, year };
                        });
                      }
                      console.log(year);
                    }}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AllFromCategory;
