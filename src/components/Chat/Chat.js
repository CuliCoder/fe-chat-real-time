import React, { useEffect, useContext } from "react";
import "./Chat.scss";
import { ModeContext } from "../../context/mode";
const Chat = React.memo(
  ({
    fullname,
    avatar,
    messages,
    user_id,
    sendMsg,
    leave_room,
    is_in_room,
  }) => {
    const { mode } = useContext(ModeContext);
    const enterSend = (e) => {
      if (e.key !== "Enter") return;
      document.querySelector(".send-message").click();
    };
    useEffect(() => {
      const chatContent = document.querySelector(".chat-content");
      chatContent.scrollTop = chatContent.scrollHeight;
    }, [messages]);
    useEffect(() => {
      document.querySelector(".input-message").focus();
    }, [fullname]);
    return (
      <div
        className={
          is_in_room
            ? "container-chat col col-md"
            : "container-chat col-md d-none"
        }
      >
        <div className="chat-header">
          <div
            className={
              mode === "true"
                ? "btn-leave-room btn-leave-room-dark-mode d-block d-md-none"
                : "btn-leave-room d-block d-md-none"
            }
            onClick={leave_room}
          >
            <img
              src={mode === "true" ? "img/left-dark-mode.png" : "img/left.png"}
            />
          </div>
          <div
            className="chat-avatar"
            data-bs-toggle="modal"
            data-bs-target="#AnotherProfileModal"
          >
            <img
              src={process.env.REACT_APP_IO_URL + "/Avatar/" + avatar}
              className="avatar"
            />
          </div>
          <div className="chat-name">{fullname}</div>
        </div>
        <div className="chat-content">
          {messages.map((item) => {
            const isMyMessage = item.user_id === user_id ? true : false;
            if (!isMyMessage) {
              return (
                <div key={item.id} className="Other-message">
                  <img
                    src={process.env.REACT_APP_IO_URL + "/Avatar/" + avatar}
                    className="avatar"
                  />
                  <div
                    className={
                      mode === "true" ? "message message-dark-mode" : "message"
                    }
                  >
                    {item.message}
                  </div>
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
            <input
              className={
                mode === "true"
                  ? "input-message input-message-dark-mode"
                  : "input-message"
              }
              placeholder="Aa"
              onKeyDown={enterSend}
            />
            <button className="send-message" onClick={sendMsg}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export default Chat;
