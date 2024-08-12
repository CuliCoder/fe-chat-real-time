import React from "react";
import "./Option.scss";
export const Option = React.memo(({ Logout }) => {
  return (
    <div className="Option-container shadow-lg d-none">
      <div className="log-out" onClick={Logout}>
        Log out
      </div>
    </div>
  );
});
