import "./Home.scss";
import React, { useEffect, useState, memo, useRef, useCallback } from "react";
import Nav from "../Navigation/Nav";
import { Option } from "../Option/Option";
import Conversation_at_home from "../Conversation/Conversation_at_home";
import Conversation_found from "../Conversation/Conversation_found";
import Chat from "../Chat/Chat";
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
import Logout from "../../redux/action/logout";
import { set } from "lodash";
const Home = () => {
  console.log("Home");
  const timeoutRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const messages = useSelector((state) => state.message.data);
  const message_loading = useSelector((state) => state.message.loading);
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
    console.log("init");
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
    socketInstance.handle_account_logged_another_device(() => {
      toast.error("Account logged in another device");
      setTimeout(() => {
        dispatch(Logout());
      }, 1000);
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

  const click_converstion = useCallback((id) => {
    show_container_chat();
    dispatch(create_conversation(id));
  }, []);
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
  }, [conversation.data.conversation_current]);
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

  const sendMsg = useCallback(() => {
    const message = document.querySelector(".input-message").value;
    if (message === "") {
      return;
    }
    socketInstance.req_send_message(message);
    document.querySelector(".input-message").value = "";
  }, [socketInstance]);
  const log_out = () => {
    dispatch(Logout());
  };
  const Open_Option = useCallback(() => {
    document.querySelector(".Option-container").classList.toggle("d-none");
  }, []);
  return (
    <>
      {(loading_creat_conversation ||
        loading_find_user ||
        loading_get_list_conversation ||
        loading_connectIO ||
        conversation.loading ||
        message_loading) && <Spinner />}
      <div className="container-home">
        <Nav Open_Option={Open_Option} />
        <Option Logout={log_out} />
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
          <Conversation_found
            list_conversations={conversation.data.conservations_found}
            click_converstion={click_converstion}
          />
          <Conversation_at_home
            list_conversations={conversation.data.conversations_at_home}
            click_converstion={click_converstion}
          />
        </div>
        <Chat
          fullname={conversation_data.fullname}
          messages={messages.messages}
          socketID={socketInstance ? socketInstance.socket.id : null}
          user_id={messages.user_id}
          sendMsg={sendMsg}
        />
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
