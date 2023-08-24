import React from "react";
import { ICard } from "../../types/card";
import { IFilterItem } from "../../types/filters";
import Filter from "./Filter";
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

  // const [navItems, setNavItems] = React.useState<IFilterItem[] | null>(null);

  // React.useEffect(() => {
  //   const arrByTitle = cards.map((item) => item.title);
  //   const dublicateRemoving = Array.from(new Set(arrByTitle));

  //   const items: IFilterItem[] = dublicateRemoving?.map((item) => {
  //     return {
  //       isActive: false,
  //       title: item,
  //       total: arrByTitle ? getTotal(arrByTitle, item) : 0,
  //     };
  //   });

  //   setNavItems(items);
  // }, [cards]);

  // const clickHandler = (ni: IFilterItem) => {
  //   if (ni.isActive) {
  //     //click on active filter item
  //     const arr = navItems?.map((item) => {
  //       return { ...item, isActive: false };
  //     });
  //     if (arr) {
  //       //render
  //       setNavItems([...arr]);
  //     }
  //     //swich off filter on parent component
  //     dataHandler(null);
  //   } else {
  //     //click on not active filter item
  //     const arr = navItems?.map((item) => {
  //       if (ni.title === item.title) {
  //         return { ...item, isActive: true };
  //       } else {
  //         return { ...item, isActive: false };
  //       }
  //     });
  //     if (arr) {
  //       //render
  //       setNavItems([...arr]);
  //     }
  //     dataHandler(ni.title);
  //     //swich on filter on parent component
  //   }
  // };

  const letterClickHandler = (value: {
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

  const itemClickHandler = (item: ITitleItem) => {
    if (item.isActive) {
      dataHandler(null);
    } else {
      dataHandler(item.title);
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
                  className={`cursor-pointer border py-2 px-4 rounded-lg hover:${BAGROUNDS.ACTIVE_BORDER} hover:scale-105 transition-transform shadow-md`}
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
