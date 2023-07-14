import React from "react";
import client from "../../../api/sanityClient";
import Spinner from "../../common/spinner/Spinner";

interface IYear {
  _id: string;
  title: string;
}

function Years() {
  const [data, setData] = React.useState<IYear[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "year"]{ _id,
          title,
        }`;
        const result = await client.fetch<IYear[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);
  const sortedData = data?.sort(
    (a, b) => parseInt(a.title) - parseInt(b.title)
  );

  if (!data)
    return (
      <div className='mx-2 md:mx-[5%] flex justify-center items-center mt-[10%]'>
        <Spinner />
      </div>
    );
  if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return (
    <div className='py-5 mx-2 md:mx-[5%] flex flex-col items-center md:items-start gap-y-4'>
      {/* <p className='font-bold text-xl uppercase'>Dostępne roczniki:</p> */}
      <ul className='flex flex-col gap-y-3 text-lg font-thin items-center md:items-start '>
        {sortedData?.map((item) => (
          <li className='hover:underline' key={item._id}>
            <a href={`/kartki?rok=${item.title}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Years;
