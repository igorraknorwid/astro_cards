import React from "react";
import client from "../../../api/sanityClient";
import Spinner from "../../common/spinner/Spinner";
import { capitalizeFirstLetterInEveryWord } from "../../../utils/capitalize/capitalise";
import { groq_params } from "../../../api/groq/groq";

interface ITheme {
  _id: string;
  title: string;
}

function Themes() {
  const [data, setData] = React.useState<ITheme[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "theme"]{${groq_params.theme_groq_params}}`;
        const results = await client.fetch<ITheme[]>(query);
        // console.log(results);
        setData(results);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  const sortedData = data
    ?.slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  if (!data)
    return (
      <div className='mx-2 md:mx-[5%] flex justify-center items-center mt-[10%]'>
        <Spinner />
      </div>
    );
  if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return (
    <div className='py-5 mx-2 md:mx-[5%] flex flex-col items-center md:items-start gap-y-4'>
      <ul className='flex flex-col md:flex-row flex-wrap gap-3 md:gap-10 text-lg font-thin items-center md:items-start '>
        {sortedData?.map((item) => (
          <li className='hover:underline ' key={item._id}>
            <a
              className='border py-1 px-2 rounded-md shadow-md'
              href={`/calosc?temat=${item.title}`}
            >
              {capitalizeFirstLetterInEveryWord(item.title)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Themes;
