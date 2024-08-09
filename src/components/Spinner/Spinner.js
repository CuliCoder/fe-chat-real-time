import DotLoader from "react-spinners/DotLoader";
import "./Spinner.scss";
import React from "react";
const Spinner = React.memo(() => {
  return (
    <div className="container-spinner">
      <DotLoader color="#198aff" />
    </div>
  );
});
export default Spinner;
