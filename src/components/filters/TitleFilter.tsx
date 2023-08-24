import React from "react";
import { ICard } from "../../types/card";
import { ITitleItem } from "../../types/title";
import { segregateArrayByTitle } from "../../utils/segregation";
import { BAGROUNDS, FONTCOLOR } from "../../utils/constants/colors";
import { capitalizeFirstLetterInEveryWord } from "../../utils/capitalize/capitalise";
import NavTitle from "../common/nav_title/NavTitle";

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

interface ITitleFilter {
  cards: ICard[];
  dataHandler: (value: string | null) => void;
}

function TitleFilter({ cards, dataHandler }: ITitleFilter) {
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
        isActive: false,
      };
    });
    const alfabet = segregateArrayByTitle(items);
    setData(alfabet);
  }, [cards]);

  const letterClickHandler = (value: {
    letter: string;
    items: ITitleItem[];
    isActive: boolean;
  }) => {
    if (value.isActive) {
      const mapedData = [...data].map((item, i) => {
        if (i === 0) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
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

  const itemClickHandler = (value: ITitleItem) => {
    if (value.isActive) {
      const mapedData = [...data].map((item) => {
        const changedItem = {
          ...item,
          items: [...item.items].map((x) => {
            if (x.title === value.title) {
              return { ...x, isActive: false };
            } else {
              return { ...x, isActive: false };
            }
          }),
        };
        return changedItem;
      });
      setData(mapedData);
      dataHandler(null);
    } else {
      const mapedData = [...data].map((item) => {
        const changedItem = {
          ...item,
          items: [...item.items].map((x) => {
            if (x.title === value.title) {
              return { ...x, isActive: true };
            } else {
              return { ...x, isActive: false };
            }
          }),
        };
        return changedItem;
      });
      setData(mapedData);
      dataHandler(value.title);
    }
  };

  return (
    // <Filter
    //   filterItems={navItems}
    //   clickHandler={clickHandler}
    //   title='Karty według nazwisk autorów czy nazw dzieł'
    // />
    <section>
      <div className={`${BAGROUNDS.SECONDARY} py-2 md:px-4 rounded-lg`}>
        <NavTitle title='Karty według nazwisk autorów czy nazw dzieł' />

        <ul
          className={`grid grid-cols-6 gap-4 py-2 px-3 rounded-lg ${BAGROUNDS.PASSIVE}`}
        >
          {data?.map((item, i) => (
            <li key={i}>
              <button
                className={`px-4 py-2 rounded-lg shadow-md ${
                  item.isActive
                    ? `${BAGROUNDS.ACTIVE} ${FONTCOLOR.ACTIVE}`
                    : `border hover:scale-105 hover:${BAGROUNDS.ACTIVE_BORDER} transition-transform`
                }`}
                type='button'
                onClick={() => {
                  letterClickHandler(item);
                }}
              >
                {item.letter}
              </button>
            </li>
          ))}
        </ul>
        {find ? (
          <div className={`mt-5 ${BAGROUNDS.PASSIVE} rounded-lg`}>
            {/* <p className='font-bold underline text-center text-xl p-2 rounded-t-lg'>
            {find.letter}
          </p> */}
            <ul className='flex flex-col gap-y-2 justify-center  items-start  p-2 text-lg font-mono'>
              {find.items.map((v, i) => (
                <li
                  onClick={() => {
                    itemClickHandler(v);
                  }}
                  key={i}
                  className={`cursor-pointer border py-2 px-4 rounded-lg hover:${
                    BAGROUNDS.ACTIVE_BORDER
                  } hover:scale-105 transition-transform shadow-md ${
                    v.isActive
                      ? `${BAGROUNDS.ACTIVE} ${FONTCOLOR.ACTIVE}`
                      : `border hover:scale-105 hover:border-blue-600 transition-transform`
                  }`}
                >
                  <div className='flex gap-x-2'>
                    <div>{capitalizeFirstLetterInEveryWord(v.title)}</div>
                    <div className='underline'>{v.total}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default TitleFilter;
