import "./Home.scss";
import React, { useEffect, useState, memo, useRef } from "react";
import Nav from "../Navigation/Nav";
import { useSelector, useDispatch } from "react-redux";
import { find_user, find_user_Close } from "../../redux/action/find";
import {
  create_conversation,
  update_list_Conversation_at_home,
} from "../../redux/action/conversation";
import { load_all_Message, new_Message } from "../../redux/action/message";
import { toast } from "react-toastify";
import socket from "../../services/configSocketIO";
import {
  get_list_Conversation_at_home,
  get_list_Conversation_found,
} from "../../redux/action/conversation";
import Spinner from "../Spinner/Spinner";
import { loading_request, finish_request } from "../../redux/action/loading";
const Home = () => {
  console.log("Home");
  const timeoutRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const messages = useSelector((state) => state.message.data);
  const conversation_data = useSelector(
    (state) => state.create_conversation.data
  );

  const loading_creat_conversation = useSelector(
    (state) => state.create_conversation.loading
  );
  const loading_find_user = useSelector((state) => state.find_user.loading);
  const loading_get_list_conversation = useSelector(
    (state) => state.get_list_conversation.loading
  );
  const loading_connectIO = useSelector((state) => state.loading.loading);
  const conversation = useSelector((state) => state.conversation);

  const dispatch = useDispatch();
  useEffect(() => {
    const initSocket = async () => {
      dispatch(loading_request());
      const SocketIO = new socket();
      await SocketIO.initialize();
      setSocketInstance(SocketIO);
      dispatch(finish_request());
    };
    initSocket();
    dispatch(get_list_Conversation_at_home());
  }, []);

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
    socketInstance.handle_get_list_conversations_at_home((data) => {
      dispatch(update_list_Conversation_at_home(data));
    });
    socketInstance.handle_disconnect(() => {
      console.log("disconnect");
    });
  }, [socketInstance]);

  const change_find = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(get_list_Conversation_found(e.target.value));
    }, 500);
  };
  const show_container_chat = () => {
    if (!document.querySelector(".container-chat").classList.contains("d-none"))
      return;
    document.querySelector(".container-chat").classList.remove("d-none");
    document.querySelector(".container-welcome").classList.add("d-none");
  };
  const click_converstion = (id) => {
    show_container_chat();
    dispatch(create_conversation(id));
  };
  useEffect(() => {
    if (Object.keys(conversation.data.conversation_current).length !== 0) {
      socketInstance.req_join_rom({
        conversation_id: conversation.data.conversation_current.conversation_id,
        user_two: conversation.data.conversation_current.user_two,
      });
      dispatch(
        load_all_Message(conversation.data.conversation_current.conversation_id)
      );
    }
  }, [conversation]);
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
    socketInstance.req_send_message(message);
    document.querySelector(".input-message").value = "";
  };

  return (
    <>
      {(loading_creat_conversation ||
        loading_find_user ||
        loading_get_list_conversation ||
        loading_connectIO ||
        conversation.loading) && <Spinner />}
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
            {conversation.data.conservations_found.map((item) => {
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
            {conversation.data.conversations_at_home.map((item) => {
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
            {messages.messages.map((item) => {
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
