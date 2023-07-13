import React from "react";
import { ICard } from "../../../types/card";
import client from "../../../api/sanityClient";
import YearTitle from "../../common/year_title/YearTitle";
import Spinner from "../../common/spinner/Spinner";
import CardCounter from "../../common/card_couter/CardCounter";
import CardList from "../../common/card_list/CardList";
import TitleFilter from "../../filters/TitleFilter";

function CardsByCategory() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<string | null>(null);

  const setDataFilter = (value: string | null) => {
    setFilter(value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const year = queryParams.get("rok");
        setYear(year);
        const category = queryParams.get("temat");
        setCategory(category);
        const query = `*[_type == 'card' && '${year}' in years[]->title && theme->title == "${category}"]{ _id, title,image_slug,theme->{title},
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

  const filteredData = data?.filter((item) => {
    if (filter === null) {
      return true;
    } else {
      return item.title === filter;
    }
  });

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
      <p>Temat:{category}</p>
      <CardCounter cards={filteredData} />
      <TitleFilter cards={data} dataHandler={setDataFilter} />
      {filteredData && <CardList cards={filteredData} itemsPerPage={5} />}
    </div>
  );
}

export default CardsByCategory;
