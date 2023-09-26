import React from "react";
import { ICard, INavigation } from "../../types/card";
import NavTitle from "../common/nav_title/NavTitle";
// import { BAGROUNDS } from "../../utils/constants/colors";
import { capitalizeFirstLetterInEveryWord } from "../../utils/capitalize/capitalise";

interface ISubtheme {
  title: string;
  total: number;
}

interface INavigationItems {
  title: string;
  total: number;
  subthemes?: ISubtheme[];
}
[];

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

function setSubthemes(cards: ICard[], value: string) {
  let arr: string[] = [];
  cards.forEach((item) => {
    if (
      item.theme2.map((el) => el.title).includes(value) &&
      item.subtheme2 !== null
    ) {
      item.subtheme2.forEach((el) => arr.push(el.title));
    }
  });
  const subthemeSet = Array.from(new Set(arr));
  return subthemeSet
    .map((item) => {
      return {
        title: item,
        total: getTotal(arr, item),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function CategoryNavigation({ cards, year }: INavigation) {
  // const categoryArrByTheme = cards.map((item) => item.theme.title);
  let categoryArrByTheme: string[] = [];
  cards.forEach((card) =>
    card.theme2?.forEach((theme) => {
      categoryArrByTheme.push(theme.title);
    })
  );

  const dublicateRemoving = Array.from(new Set(categoryArrByTheme));

  const items: INavigationItems[] = dublicateRemoving?.map((item) => {
    const subthemes = setSubthemes(cards, item);
    if (subthemes.length > 0) {
      return {
        title: item,
        total: categoryArrByTheme ? getTotal(categoryArrByTheme, item) : 0,
        subthemes,
      };
    } else {
      return {
        title: item,
        total: categoryArrByTheme ? getTotal(categoryArrByTheme, item) : 0,
      };
    }
  });

  return (
    <div className='bg-blue-200 py-2 px-4 rounded-lg'>
      <NavTitle title='Karty według tematów' />
      <ul className=' bg-white py-2 px-4 rounded-lg flex flex-col items-start gap-2 border text-sm '>
        {items.map((c, i) => (
          <li
            key={i}
            className={` border basis-auto py-1 px-4 rounded-lg hover:border-blue-700 hover:scale-105 transition-transform shadow-md`}
          >
            <a href={`/temat?rok=${year}&temat=${c.title}`}>
              <div className='flex gap-x-2 text-base'>
                <div>{capitalizeFirstLetterInEveryWord(c.title)}</div>
                <div>
                  {c.total ? <div className='underline'>{c.total}</div> : null}
                </div>
              </div>
            </a>
            {c.subthemes && (
              <ul className='flex flex-col items-end'>
                {c.subthemes.map((subtheme, i) => (
                  <li key={i}>
                    <a
                      href={`/temat?rok=${year}&temat=${c.title}&subtemat=${subtheme.title}`}
                    >
                      <div className='flex gap-x-2 text-sm'>
                        <div>
                          {capitalizeFirstLetterInEveryWord(subtheme.title)}
                        </div>
                        <div className='underline'> {subtheme.total}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryNavigation;
