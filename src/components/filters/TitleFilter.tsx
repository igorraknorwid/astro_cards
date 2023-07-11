import React from "react";
import { ICard } from "../../types/card";

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
    <ul className='flex gap-x-4 border border-green-500'>
      {navItems?.map((ni, i) => (
        <li key={i}>
          <div className='flex gap-x-2'>
            <div
              className={`${
                ni.isActive ? "font-bold" : "font-light"
              } cursor-pointer`}
              onClick={() => clickHandler(ni)}
            >
              {ni.title}
            </div>
            <div>
              {ni.total ? <div className='underline'>{ni.total}</div> : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TitleFilter;
