import React, { useEffect, useState, useContext } from "react";
import "./Option.scss";
import { useSelector } from "react-redux";
import { ModeContext } from "../../context/mode";
export const Option = React.memo(({ Logout }) => {
  const { mode, changeMode } = useContext(ModeContext);
  const userInfo = useSelector((state) => state.user.data.userInfo);
  const [fullname, setFullname] = useState(null);
  useEffect(() => {
    if (userInfo) {
      setFullname(userInfo.fullname);
    }
  }, [userInfo]);
  const handleClick = () => {
    document.querySelector(".bg-option").classList.add("d-none");
  };
  return (
    <div className="bg-option d-none" onClick={handleClick}>
      <div className="Option-container shadow-lg">
        <div className="user-name fw-bold fs-5">
          {fullname ? fullname : "loading"}
        </div>
        <div className="list-option">
          <div
            className="Profile"
            data-bs-toggle="modal"
            data-bs-target="#ProfileModal"
          >
            Profile
          </div>
          <div className="mode" onClick={changeMode}>
            {mode === "true" ? "Light mode" : "Dark mode"}
          </div>
          <div className="log-out" onClick={Logout}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
});
