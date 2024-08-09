import React from "react";
import "./Chat.scss";
const Chat = React.memo(
  ({ fullname, messages, socketID, user_id, sendMsg }) => {
    return (
      <div className="container-chat d-none">
        <div className="chat-header">
          <div className="chat-avatar">
            <div className="avatar"></div>
          </div>
          <div className="chat-name">{fullname}</div>
        </div>
        <div className="chat-content">
          {messages.map((item) => {
            const isMyMessage =
              item.socketID !== undefined
                ? item.socketID === socketID
                  ? true
                  : false
                : item.user_id === user_id
                ? true
                : false;
            if (!isMyMessage) {
              return (
                <div key={item.id} className="Other-message">
                  <div className="avatar"></div>
                  <div className="message">{item.message}</div>
                </div>
              );
            }
            return (
              <div key={item.id} className="My-message">
                <div className="message">{item.message}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-input">
          <div className="container-input">
            <input className="input-message" placeholder="Aa" />
            <button className="send-message" onClick={() => sendMsg()}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export default Chat;