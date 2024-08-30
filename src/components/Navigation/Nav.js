import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAvatar,getInformation } from "../../redux/action/user";
const Nav = React.memo(({ Open_Option }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getInformation());
  }, []);
  return (
    <div className="topnav col-1">
      <div className="container-avatar">
        <img
          src={process.env.REACT_APP_IO_URL + "/Avatar/" + user.userInfo?.avatar}
          alt="loading"
          className="avatar"
          onClick={Open_Option}
        />
      </div>
    </div>
  );
});
export default Nav;
