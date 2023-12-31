import React from "react";

function Spinner() {
  return (
    <div
      className='text-blue-700 inline-block h-32 w-32 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'></span>
    </div>
  );
}

export default Spinner;
