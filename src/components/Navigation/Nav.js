import React from "react";
import "./Nav.scss";
import MyImage from "../../img/avatar.jpg";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="topnav">
      <div className="container-avatar">
          <div className="avatar"></div>
      </div>
    </div>
  );
};
export default Nav;
