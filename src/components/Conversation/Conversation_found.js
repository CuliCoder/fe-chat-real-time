import "./Conversation_found.scss";
import React, { useContext } from "react";
import { ModeContext } from "../../context/mode";
const Conversation_found = React.memo(
  ({ list_conversations, click_converstion }) => {
    const { mode } = useContext(ModeContext);
    return (
      <div
        className={
          mode === "true"
            ? "container-list-user container-list-user-dark-mode d-none"
            : "container-list-user d-none"
        }
      >
        {list_conversations.map((item) => {
          return (
            <div
              key={item.id}
              className="user"
              onClick={() =>
                click_converstion({
                  user_id: item.id,
                  fullname: item.fullname,
                  avatar: item.avatar,
                  gender: item.gender,
                })
              }
            >
              <div className="user-avatar">
                <img
                  className="avatar"
                  src={process.env.REACT_APP_IO_URL + "/Avatar/" + item.avatar}
                />
              </div>
              <div className="user-name">
                <div className="name">{item.fullname}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
export default Conversation_found;
