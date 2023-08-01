import React from "react";
import { ICard } from "../../types/card";
import { BAGROUNDS, FONTCOLOR } from "../../utils/constants/colors";
import { capitalizeFirstLetterInEveryWord } from "../../utils/capitalize/capitalise";
import NavTitle from "../common/nav_title/NavTitle";
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
    const arrByTitle = cards.map((item) => item.theme.title);
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



  return (<Filter filterItems={navItems} clickHandler={clickHandler} title="Kartki według nazwisk autorów czy nazw dzieł"/>
 
  );
}

export default CategoryFilter;
