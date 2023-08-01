import React from "react";
import { ICard } from "../../types/card";
import { IFilterItem } from "../../types/filters";
import Filter from "./Filter";

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

interface ITitleFilter {
  cards: ICard[];
  dataHandler: (value: string | null) => void;
}



function TitleFilter({ cards, dataHandler }: ITitleFilter) {
  const [navItems, setNavItems] = React.useState<IFilterItem[] | null>(null);

  React.useEffect(() => {
    const arrByTitle = cards.map((item) => item.title);
    const dublicateRemoving = Array.from(new Set(arrByTitle));
    const items: IFilterItem[] = dublicateRemoving?.map((item) => {
      return {
        isActive: false,
        title: item,
        total: arrByTitle ? getTotal(arrByTitle, item) : 0,
      };
    });
    setNavItems(items);
  }, [cards]);

  const clickHandler = (ni: IFilterItem) => {
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

  return (<Filter filterItems={navItems} clickHandler={clickHandler} title="Karty według nazwisk autorów czy nazw dzieł"/> 
  );
}

export default TitleFilter;
