import React from "react";
import "./Conversation_at_home.scss";
const Conversation_at_home = React.memo(
  ({ list_conversations, click_converstion }) => {
    return (
      <div className="container-conversations " data-spy="scroll">
        {list_conversations.map((item) => {
          return (
            <div
              key={item.remaining_user_id}
              className="conversation"
              onClick={() => click_converstion(item.remaining_user_id)}
            >
              <div className="conversation-avatar">
                <div className="avatar"></div>
              </div>
              <div className="conversation-content">
                <div className="conversation-name">
                  {item.remaining_user_fullname}
                </div>
                <div
                  className={
                    item.remaining_user_id === item.message_user_id &&
                    item.is_seen === 0
                      ? "conversation-message not_seen"
                      : "conversation-message"
                  }
                >
                  {item.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
export default Conversation_at_home;