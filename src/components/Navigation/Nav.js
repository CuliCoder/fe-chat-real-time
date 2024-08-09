import React from "react";
import "./Nav.scss";
const Nav = React.memo(() => {
  return (
    <div className="topnav">
      <div className="container-avatar">
        <div className="avatar"></div>
      </div>
    </div>
  );
});
export default Nav;
