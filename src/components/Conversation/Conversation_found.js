import "./Conversation_found.scss";
import React from "react";
const Conversation_found = React.memo(({ list_conversations,click_converstion }) => {
    console.log("conversation found");
  return (
    <div className="container-list-user d-none">
      {list_conversations.map((item) => {
        return (
          <div
            key={item.id}
            className="user"
            onClick={() => click_converstion(item.id)}
          >
            <div className="user-avatar">
              <div className="avatar"></div>
            </div>
            <div className="user-name">
              <div className="name">{item.fullname}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
export default Conversation_found;
