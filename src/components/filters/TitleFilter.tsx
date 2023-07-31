import React from "react";
import { ICard } from "../../types/card";
import { capitalizeFirstLetterInEveryWord } from "../../utils/capitalize/capitalise";
import { BAGROUNDS, FONTCOLOR } from "../../utils/constants/colors";
import NavTitle from "../common/nav_title/NavTitle";

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

interface ITitleFilter {
  cards: ICard[];
  dataHandler: (value: string | null) => void;
}

interface IItem {
  isActive: boolean;
  title: string;
  total: number;
}

function TitleFilter({ cards, dataHandler }: ITitleFilter) {
  const [navItems, setNavItems] = React.useState<IItem[] | null>(null);

  React.useEffect(() => {
    const arrByTitle = cards.map((item) => item.title);
    const dublicateRemoving = Array.from(new Set(arrByTitle));
    const items: IItem[] = dublicateRemoving?.map((item) => {
      return {
        isActive: false,
        title: item,
        total: arrByTitle ? getTotal(arrByTitle, item) : 0,
      };
    });
    setNavItems(items);
  }, [cards]);

  const clickHandler = (ni: IItem) => {
    if (ni.isActive) {
      //click on active filter item
      const arr = navItems?.map((item) => {
        return { ...item, isActive: false };
      });
      if (arr) {
        //render
        setNavItems([...arr]);
      }
      //swich off filter on parent component
      dataHandler(null);
    } else {
      //click on not active filter item
      const arr = navItems?.map((item) => {
        if (ni.title === item.title) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });
      if (arr) {
        //render
        setNavItems([...arr]);
      }
      dataHandler(ni.title);
      //swich on filter on parent component
    }
  };

  return (
    <section className={`${BAGROUNDS.SECONDARY} py-2 md:px-4 rounded-lg`}>
      <NavTitle title='Kartki według nazwisk autorów czy nazw dzieł' />
      <div className={` ${BAGROUNDS.PASSIVE}  py-2 px-3 rounded-lg`}>
        <ul className='flex items-start flex-col gap-4 text-lg '>
          {navItems?.map((ni, i) => (
            <li key={i}>
              <div
                className={`flex  gap-2 px-4 py-2 rounded-lg shadow-md cursor-pointer  ${
                  ni.isActive
                    ? `${BAGROUNDS.ACTIVE} ${FONTCOLOR.ACTIVE}`
                    : `border hover:scale-105 hover:border-blue-600 transition-transform`
                }`}
                onClick={() => clickHandler(ni)}
              >
                <div>{capitalizeFirstLetterInEveryWord(ni.title)}</div>
                <div>
                  {ni.total ? (
                    <div className='underline'>{ni.total}</div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TitleFilter;
