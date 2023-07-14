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

  return (
    <div>
      {/* <ul className='flex flex-col gap-y-2 gap-x-4 border border-red-500 text-lg'>
        {items.map((c, i) => (
          <li key={i}>
            <a href={`/nazwa?rok=${year}&nazwa=${c.title}`}>
              <div className='flex gap-x-2'>
                <div>{c.title}</div>
                <div>
                  {c.total ? <div className='underline'>{c.total}</div> : null}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul> */}
      <ul>
        {data?.map((item, i) => (
          <li key={i}>
            <div>
              <button
                className='font-bold'
                onClick={() => {
                  clickHandler(item);
                }}
              >
                {item.letter}
              </button>
              {item.isActive && (
                <ul>
                  {item.items.map((v, i) => (
                    <li key={i}>
                      <a href={`/nazwa?rok=${year}&nazwa=${v.title}`}>
                        <div className='flex gap-x-2'>
                          <div>{v.title}</div>
                          <div>{v.total}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TitleNavigation;
