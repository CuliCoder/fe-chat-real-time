import React from "react";
import "./Nav.scss";
const Nav = React.memo(({Open_Option}) => {
  return (
    <div className="topnav">
      <div className="container-avatar">
        <div className="avatar" onClick={Open_Option}></div>
      </div>
    </div>
  );
});
export default Nav;
