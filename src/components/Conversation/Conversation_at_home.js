import React, { useContext, useEffect, useState } from "react";
import "./Conversation_at_home.scss";
import { ModeContext } from "../../context/mode";
import { useSelector } from "react-redux";
const Conversation_at_home = React.memo(
  ({ list_conversations, click_converstion }) => {
    const { mode } = useContext(ModeContext);
    const user = useSelector((state) => state.user.data);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
      if (user.userInfo) {
        setUserInfo(user.userInfo);
      }
    }, [user.userInfo]);
    return (
      <div
        className={
          mode === "true"
            ? "container-conversations container-conversations-dark-mode"
            : "container-conversations"
        }
      >
        {userInfo && list_conversations.map((item) => {
          return (
            <div
              key={item.user_id}
              className="conversation"
              onClick={() => click_converstion(item)}
            >
              <div className="conversation-avatar">
                <img
                  src={process.env.REACT_APP_IO_URL + "/Avatar/" + item.avatar}
                  className="avatar"
                />
              </div>
              <div className="conversation-content">
                <div className="conversation-name">{item.fullname}</div>
                <div
                  className={
                    mode === "true"
                      ? userInfo.id !== item.user_send_last_message &&
                        item.is_seen === 0
                        ? "conversation-message conversation-message-dark-mode not_seen-dark-mode"
                        : "conversation-message conversation-message-dark-mode "
                      : userInfo.id !== item.user_send_last_message &&
                        item.is_seen === 0
                      ? "conversation-message not_seen"
                      : "conversation-message"
                  }
                >
                  {userInfo.id === item.user_send_last_message
                    ? "You: " + item.last_message
                    : item.last_message}
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
