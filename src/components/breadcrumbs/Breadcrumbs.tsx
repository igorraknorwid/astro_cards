import React from "react";

function Breadcrumbs() {
  const [year, setYear] = React.useState("");
  const [home, setHome] = React.useState("");

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log(window.location.pathname);
    const year = queryParams.get("rok");
    setYear(year);
  }, []);

  return <div className=''>{year}</div>;
}

export default Breadcrumbs;
