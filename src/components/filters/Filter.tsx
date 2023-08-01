import React from "react";
import { capitalizeFirstLetterInEveryWord } from "../../utils/capitalize/capitalise";
import { BAGROUNDS, FONTCOLOR } from "../../utils/constants/colors";
import NavTitle from "../common/nav_title/NavTitle";
import { IFilterItem } from "../../types/filters";

interface IFilter{
  title:string;
  filterItems:IFilterItem[];
  clickHandler(iten:IFilterItem):void
}


function Filter({filterItems,clickHandler,title}: IFilter) {
  return (
    <section className={`${BAGROUNDS.SECONDARY} py-2 md:px-4 rounded-lg`}>
      <NavTitle title={title}/>
      <div className={` ${BAGROUNDS.PASSIVE}  py-2 px-3 rounded-lg`}>
        <ul className='flex items-start flex-col gap-4 text-lg '>
          {filterItems?.map((ni, i) => (
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

export default Filter;
