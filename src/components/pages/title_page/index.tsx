import React from "react";
import { ICard } from "../../../types/card";
import client from "../../../api/sanityClient";
import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import CategoryFilter from "../../filters/CategoryFilter";

function CardsByTitle() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [year, setYear] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string | null>(null);

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
        const query = `*[_type == 'card' && '${year}' in years[]->title && title == '${title}']{ _id, title,image_slug,theme->{title},
      }`;
        const result = await client.fetch<ICard[]>(query);
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
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <p>Nazwa:{title}</p>
      <CardCounter cards={filteredData} />
      <CategoryFilter cards={data} dataHandler={setDataFilter} />
      {filteredData && <CardList cards={filteredData} itemsPerPage={5} />}
    </div>
  );
}

export default CardsByTitle;
