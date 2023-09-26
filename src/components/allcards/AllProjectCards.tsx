import React from "react";
import client from "../../api/sanityClient";
import Spinner from "../common/spinner/Spinner";
import { ICard } from "../../types/card";

function AllProjectCards() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card"]{_id}`;
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
      <div className='mx-2 md:mx-[5%] flex justify-center items-center mt-[10%]'>
        <Spinner />
      </div>
    );
  if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return (
    <div className='py-5 mx-2 md:mx-[5%] flex flex-col items-center md:items-start gap-y-4'>
      <div className='text-lg font-thin'>
        Łączna aktualna liczba kart bibliograficznych:{data.length + 1}
      </div>
    </div>
  );
}

export default AllProjectCards;
