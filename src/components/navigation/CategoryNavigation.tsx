import React from "react";
import { ICard, INavigation } from "../../types/card";

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
    if (item.theme.title === value && item.subtheme) {
      arr.push(item.subtheme.title);
    }
  });
  const subthemeSet = Array.from(new Set(arr));
  return subthemeSet.map((item) => {
    return {
      title: item,
      total: getTotal(arr, item),
    };
  });
}

function CategoryNavigation({ cards, year }: INavigation) {
  const categoryArrByTheme = cards.map((item) => item.theme.title);
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
    <div className='m-4 bg-gray-300 py-2 px-4 rounded-lg'>
      <p className='text-center font-bold text-xl p-2'>
        Kartki według tematów:
      </p>
      <ul className='my-2  bg-white py-2 px-4 rounded-lg flex gap-x-4 border flex-wrap text-sm'>
        {items.map((c, i) => (
          <li key={i} className='border py-2 px-4'>
            <a href={`/temat?rok=${year}&temat=${c.title}`}>
              <div className='flex gap-x-2 text-xl'>
                <div>{c.title}</div>
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
                        <div> {subtheme.title}</div>
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
