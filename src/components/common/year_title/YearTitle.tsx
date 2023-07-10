import React from "react";

interface IYearTitle {
  year: string | null;
}

function YearTitle({ year }: IYearTitle) {
  return <h1 className='font-bold text-2xl'>Rok {year} </h1>;
}

export default YearTitle;
