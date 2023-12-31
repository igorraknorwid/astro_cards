import React from "react";
import { ICard } from "../../types/card";
import Filter from "./Filter";

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

interface IFilter {
  cards: ICard[];
  dataHandler: (value: string | null) => void;
}

interface IItem {
  isActive: boolean;
  title: string;
  total: number;
}

function CategoryFilter({ cards, dataHandler }: IFilter) {
  const [navItems, setNavItems] = React.useState<IItem[] | null>(null);

  React.useEffect(() => {
    let arrByTitle: string[] = [];
    cards.forEach((card) =>
      card.theme2?.forEach((theme) => {
        arrByTitle.push(theme.title);
      })
    );
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
    <Filter filterItems={navItems} clickHandler={clickHandler} title='Tematy' />
  );
}

export default CategoryFilter;
