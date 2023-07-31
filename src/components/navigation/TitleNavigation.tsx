import React from "react";
import { INavigation } from "../../types/card";
import { ITitleItem } from "../../types/title";
import { segregateArrayByTitle } from "../../utils/segregation";
function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

function TitleNavigation({ cards, year }: INavigation) {
  const [data, setData] = React.useState<
    | {
        letter: string;
        items: ITitleItem[];
        isActive: boolean;
      }[]
    | null
  >(null);

  React.useEffect(() => {
    const arrByTitle = cards.map((item) => item.title);
    const dublicateRemoving = Array.from(new Set(arrByTitle));
    const items: ITitleItem[] = dublicateRemoving?.map((item) => {
      return {
        title: item,
        total: arrByTitle ? getTotal(arrByTitle, item) : 0,
      };
    });
    const alfabet = segregateArrayByTitle(items);
    setData(alfabet);
  }, [cards]);

  const clickHandler = (value: {
    letter: string;
    items: ITitleItem[];
    isActive: boolean;
  }) => {
    if (value.isActive) {
      const mapedData = [...data].map((item) => {
        return { ...item, isActive: false };
      });
      setData(mapedData);
    } else {
      const mapedData = [...data].map((item) => {
        if (item.letter === value.letter) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });
      setData(mapedData);
    }
  };

  const find = data?.find((item) => item.isActive === true);

  return (
    <div className=' bg-gray-300 p-4 rounded-lg'>
      <p className='text-center font-bold text-xl p-2'>Kartki według nazw:</p>
      <ul className='grid grid-cols-6 gap-4  bg-white py-2 px-3 rounded-lg '>
        {data?.map((item, i) => (
          <li key={i}>
            <div className='flex justify-center'>
              <button
                className={`px-4 py-2 font-bold border rounded-lg ${
                  item.isActive && "bg-blue-600 text-white"
                }`}
                onClick={() => {
                  clickHandler(item);
                }}
              >
                {item.letter}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {find ? (
        <div className=' mt-5 bg-white rounded-lg'>
          <p className='bg-blue-600 text-white text-center text-xl p-2 rounded-t-lg'>
            {find.letter}
          </p>
          <ul className='flex flex-col gap-y-2 justify-center items-center p-2 text-lg'>
            {find.items.map((v, i) => (
              <li key={i} className='hover:scale-105 hover:font-bold'>
                <a href={`/nazwa?rok=${year}&nazwa=${v.title}`}>
                  <div className='flex gap-x-2'>
                    <div>{v.title}</div>
                    <div>{v.total}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default TitleNavigation;
