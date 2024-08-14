import React from "react";
import "./Option.scss";
import { useSelector } from "react-redux";
export const Option = React.memo(({ Logout }) => {
  const userInfo = useSelector((state) => state.statusLogin.userInfo);
  return (
    <div className="Option-container shadow-lg d-none">
      <div className="user-name">{userInfo.fullname}</div>
      <div className="list-option">
        <div className="log-out" onClick={Logout}>
          Log out
        </div>
      </div>
    </div>
  );
});
