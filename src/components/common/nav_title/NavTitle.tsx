import React from "react";

interface INavTitle {
  title: string;
}

function NavTitle({ title }: INavTitle) {
  return <h2 className='text-center font-bold text-lg pb-1'>{title}</h2>;
}

export default NavTitle;
