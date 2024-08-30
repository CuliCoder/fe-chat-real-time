import "./Home.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {
  useEffect,
  useState,
  memo,
  useRef,
  useCallback,
  useContext,
} from "react";
import Nav from "../Navigation/Nav";
import { Option } from "../Option/Option";
import Conversation_at_home from "../Conversation/Conversation_at_home";
import Conversation_found from "../Conversation/Conversation_found";
import Chat from "../Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
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
  leave_conversation_action,
  close_conversation_found_action,
} from "../../redux/action/conversation";
import { loading_request_IO, finish_request_IO } from "../../redux/action/socket_IO";
import Logout from "../../redux/action/logout";
import Profile from "../Profile/Profile";
import AnotherProfile from "../Profile/AnotherProfile";
import { ModeContext } from "../../context/mode";
import "../scss/dark_mode.scss";
const Home = () => {
  const timeoutRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const messages = useSelector((state) => state.message.data);
  const user = useSelector((state) => state.user.data);
  const conversation = useSelector((state) => state.conversation.data);

  const dispatch = useDispatch();
  useEffect(() => {
    const initSocket = async () => {
      dispatch(loading_request_IO());
      const SocketIO = new socket();
      await SocketIO.initialize();
      setSocketInstance(SocketIO);
      dispatch(finish_request_IO());
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
    socketInstance.handle_notification((fullname, message) => {
      toast.info(fullname + ": " + message);
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
    socketInstance.handle_error((message) => {
      toast.error(message);
    });
    return () => {
      if (socketInstance) {
        socketInstance.socket.disconnect();
      }
    };
  }, [socketInstance]);

  const change_find = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(get_list_Conversation_found(e.target.value));
    }, 500);
  };
  const click_converstion = useCallback((user_two) => {
    dispatch(create_conversation(user_two));
  }, []);
  useEffect(() => {
    if (Object.keys(conversation.conversation_current).length !== 0) {
      socketInstance.req_join_rom({
        conversation_id: conversation.conversation_current.conversation_id,
        user_two: conversation.conversation_current.id,
      });
      dispatch(
        load_all_Message(conversation.conversation_current.conversation_id)
      );
    }
  }, [conversation.conversation_current]);
  const focus_search = () => {
    document.querySelector(".btn-close-list-user").classList.remove("d-none");
    document.querySelector(".container-conversations").classList.add("d-none");
    document.querySelector(".container-list-user").classList.remove("d-none");
  };
  const close_list_user = () => {
    document.querySelector(".input-search").value = "";
    dispatch(close_conversation_found_action());
    document.querySelector(".btn-close-list-user").classList.add("d-none");
    document
      .querySelector(".container-conversations")
      .classList.remove("d-none");
    document.querySelector(".container-list-user").classList.add("d-none");
  };

  const sendMsg = useCallback(() => {
    const message = document.querySelector(".input-message").value;
    document.querySelector(".input-message").focus();
    if (message === "") {
      return;
    }
    socketInstance.req_send_message(user.userInfo?.fullname, message);
    document.querySelector(".input-message").value = "";
  }, [socketInstance, user.userInfo]);
  const log_out = () => {
    dispatch(Logout());
  };
  const Open_Option = useCallback(() => {
    document.querySelector(".bg-option").classList.toggle("d-none");
  }, []);
  const leave_room = useCallback(() => {
    socketInstance.req_leave_room(() => {
      dispatch(leave_conversation_action());
    });
    close_list_user();
  }, [socketInstance]);
  const { mode } = useContext(ModeContext);
  return (
    <>
      <div
        className={
          mode === "true" ? "container-home dark-mode" : "container-home"
        }
      >
        <Option Logout={log_out} />
        <Profile />
        <AnotherProfile
          fullname={conversation.conversation_current.fullname}
          avatar={conversation.conversation_current.avatar}
          gender={conversation.conversation_current.gender}
          conversation_current={conversation.conversation_current}
        />
        <div className="row col-12">
          <Nav Open_Option={Open_Option} />

          <div
            className={
              Object.keys(conversation.conversation_current).length !== 0
                ? "container-list d-none d-md-block col-md-2"
                : "container-list col col-md-2"
            }
          >
            <div className="container-search ">
              <div
                className={
                  mode === "true"
                    ? "search-place search-place-dark-mode"
                    : "search-place"
                }
              >
                <label
                  className={
                    mode === "true"
                      ? "label-search label-search-dark-mode"
                      : "label-search"
                  }
                  htmlFor="input-search"
                >
                  <i className="bi bi-search"></i>
                </label>
                <input
                  id="input-search"
                  className={
                    mode === "true"
                      ? "input-search input-search-dark-mode"
                      : "input-search"
                  }
                  placeholder="Tìm kiếm"
                  onChange={change_find}
                  onFocus={focus_search}
                />
              </div>
              <button
                onClick={close_list_user}
                className={
                  mode === "true"
                    ? " btn-close-list-user btn btn-normal d-none"
                    : "btn-close-list-user btn btn-light d-none"
                }
              >
                Close
              </button>
            </div>
            <Conversation_found
              list_conversations={conversation.conservations_found}
              click_converstion={click_converstion}
            />
            <Conversation_at_home
              list_conversations={conversation.conversations_at_home}
              click_converstion={click_converstion}
            />
          </div>
          <Chat
            fullname={conversation.conversation_current.fullname}
            avatar={conversation.conversation_current.avatar}
            messages={messages.messages}
            socketID={socketInstance ? socketInstance.socket.id : null}
            user_id={messages.user_id}
            sendMsg={sendMsg}
            leave_room={leave_room}
            is_in_room={
              Object.keys(conversation.conversation_current).length !== 0
                ? true
                : false
            }
          />
          <div
            className={
              Object.keys(conversation.conversation_current).length !== 0
                ? "container-welcome col-md d-none"
                : "container-welcome col-md"
            }
          >
            <div className="welcome">
              <div className="welcome-title">Welcome to my project</div>
              <div className="welcome-content">
                This is a project that I have been working on for a long time. I
                hope you will have a great experience when using it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
