import "./Home.scss";
import React, { useEffect, useState, memo } from "react";
import Nav from "../Navigation/Nav";
import { useSelector, useDispatch } from "react-redux";
import { find_user, find_user_Close } from "../../redux/action/find";
import { create_conversation } from "../../redux/action/create";
import { load_all_Message, new_Message } from "../../redux/action/message";
import { toast } from "react-toastify";
import socket from "../../services/configSocketIO";
import { list_Conversation } from "../../redux/action/conversation";
import Spinner from "../Spinner/Spinner";
import { loading_request, finish_request } from "../../redux/action/loading";
const Home = () => {
  const [socketInstance, setSocketInstance] = useState(null);
  useEffect(() => {
    const initSocket = async () => {
      dispatch(loading_request());
      const SocketIO = new socket();
      await SocketIO.initialize();
      setSocketInstance(SocketIO);
      dispatch(finish_request());
    };
    initSocket();
  }, []);
  const user_data = useSelector((state) => state.find_user.data);
  const messages = useSelector((state) => state.message.data);
  const is_Login = useSelector((state) => state.statusLogin.isLogin);
  const conversation_data = useSelector(
    (state) => state.create_conversation.data
  );
  const list_conversation = useSelector((state) => state.conversation.data);
  const loading_creat_conversation = useSelector(
    (state) => state.create_conversation.loading
  );
  const loading_find_user = useSelector((state) => state.find_user.loading);
  const loading_get_list_conversation = useSelector(
    (state) => state.get_list_conversation.loading
  );
  const loading_connectIO = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socketInstance) return;
    socketInstance.handle_new_message((msg_data, user_id) => {
      dispatch(new_Message(msg_data, user_id));
    });
    socketInstance.handle_load_all_message_in_room((msg_data, userID) => {
      dispatch(load_all_Message(msg_data, userID));
    });
    socketInstance.handle_notification((message) => {
      toast.info(message);
    });
    socketInstance.handle_get_new_mes_of_list_conversation((data) => {
      dispatch(list_Conversation(data));
    });
    socketInstance.handle_disconnect(() => {
      console.log("disconnect");
    });
    socketInstance.req_get_new_message_of_list_conversation();
  }, [socketInstance]);
  useEffect(() => {
    console.log("get new message of list conversation");
  }, [is_Login]);
  const change_find = (e) => {
    dispatch(find_user(e.target.value));
  };
  const show_container_chat = () => {
    document.querySelector(".container-chat").classList.remove("d-none");
    document.querySelector(".container-welcome").classList.add("d-none");
  };
  const click_converstion = (id) => {
    show_container_chat();
    dispatch(create_conversation(id));
  };
  useEffect(() => {
    if (Object.keys(conversation_data).length !== 0) {
      socketInstance.req_join_rom(conversation_data.conversation_id);
    }
  }, [conversation_data]);
  const focus_search = () => {
    document.querySelector(".btn-close-list-user").classList.remove("d-none");
    document.querySelector(".container-conversations").classList.add("d-none");
    document.querySelector(".container-list-user").classList.remove("d-none");
  };
  const close_list_user = () => {
    document.querySelector(".input-search").value = "";
    dispatch(find_user_Close());
    document.querySelector(".btn-close-list-user").classList.add("d-none");
    document
      .querySelector(".container-conversations")
      .classList.remove("d-none");
    document.querySelector(".container-list-user").classList.add("d-none");
  };

  const sendMsg = () => {
    const message = document.querySelector(".input-message").value;
    if (message === "") {
      return;
    }
    socketInstance.req_send_message(message, conversation_data);
    document.querySelector(".input-message").value = "";
  };
  return (
    <>
      {(loading_find_user ||
        loading_get_list_conversation ||
        loading_connectIO ||
        loading_creat_conversation) && <Spinner />}
      <div className="container-home">
        <Nav />
        <div className="container-list">
          <div className="container-search">
            <div className="search-place">
              <label className="label-search" htmlFor="input-search">
                <i className="bi bi-search"></i>
              </label>
              <input
                id="input-search"
                className="input-search"
                placeholder="Tìm kiếm"
                onChange={change_find}
                onFocus={focus_search}
              />
            </div>
            <button
              onClick={close_list_user}
              className="btn-close-list-user btn btn-light d-none"
            >
              Close
            </button>
          </div>
          <div className="container-list-user d-none">
            {user_data.map((item) => {
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
          <div className="container-conversations " data-spy="scroll">
            {list_conversation.map((item) => {
              console.log(item);
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
        </div>
        <div className="container-chat d-none">
          <div className="chat-header">
            <div className="chat-avatar">
              <div className="avatar"></div>
            </div>
            <div className="chat-name">{conversation_data.fullname}</div>
          </div>
          <div className="chat-content">
            {messages.message.map((item) => {
              console.log(messages);
              console.log(socketInstance.socket.id);
              // const isMyMessage = messages.socketID
              //   ? messages.socketID === socketInstance.socket.id
              //     ? true
              //     : false
              //   : item.user_id === messages.user_id
              //   ? true
              //   : false;
              const isMyMessage =
                item.socketID !== undefined
                  ? item.socketID === socketInstance.socket.id
                    ? true
                    : false
                  : item.user_id === messages.user_id
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
        <div className="container-welcome">
          <div className="welcome">
            <div className="welcome-title">Welcome to my project</div>
            <div className="welcome-content">
              This is a project that I have been working on for a long time. I
              hope you will have a great experience when using it.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
