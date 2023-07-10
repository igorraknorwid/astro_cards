import React from "react";
import client from "../../api/sanityClient";
import { ICard } from "../../types/card";
// import CardList from "../../card_list/CardList";
// import CategoryNavigation from "../../navigation/CategoryNavigation";
// import TitleNavigation from "../../navigation/TitleNavigation";
// import CardCounter from "../../card_couter/CardCounter";
import YearTitle from "../common/year_title/YearTitle";
import Spinner from "../common/spinner/Spinner";
import CardCounter from "../card_couter/CardCounter";

function Cards() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const year = queryParams.get("year");
        setYear(year);
        const query = `*[_type == "card" && '${year}' in years[]->title]{ _id, title,image_slug,theme->{title},
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
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <CardCounter cards={data} />
      {/* <CategoryNavigation cards={data} year={year} />
      <TitleNavigation cards={data} year={year} />
      <CardList cards={data} itemsPerPage={5} /> */}
    </div>
  );
}

export default Cards;
