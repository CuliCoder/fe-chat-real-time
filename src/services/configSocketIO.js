import { io } from "socket.io-client";
import { get_token_io } from "./get_token";
class Socket {
  constructor() {
  }
  async initialize() {
    try {
      const token = await get_token_io();
      if (token.status === 200) {
        this.socket = io(process.env.REACT_APP_IO_URL, {
          withCredentials: true,
          "force new connection": true,
        });
        console.log("connect socket success");
      }
    } catch (err) {
      console.log(err.response);
    }
  }
  handle_new_message(callback) {
    if (!this.socket) return;
    this.socket.on("receive message", (msg_data) => {
      callback(msg_data);
    });
  }
  handle_load_all_message_in_room(callback) {
    if (!this.socket) return;
    this.socket.on("load all message in room", (msg_data, user_id) => {
      callback(msg_data, user_id);
    });
  }
  handle_disconnect(callback) {
    if (!this.socket) return;
    this.socket.on("disconnect", () => {
      callback();
    });
  }
  handle_get_list_conversations_at_home(callback) {
    if (!this.socket) return;
    this.socket.on("get list conversations at home", (data) => {
      callback(data);
    });
  }
  handle_notification(callback) {
    if (!this.socket) return;
    this.socket.on("notification", (message) => {
      callback(message);
    });
  }
  handle_room(conversation_id) {
    if (!this.socket) return;
    this.socket.emit("room", conversation_id);
    console.log("join room");
  }
  // req_get_list_conversations_at_home() {
  //   if (!this.socket) return;
  //   this.socket.emit("get list conversations at home");
  // }
  req_join_rom(conversation) {
    if (!this.socket) return;
    this.socket.emit("room", conversation);
  }
  req_send_message(message) {
    if (!this.socket) return;
    this.socket.emit("send message", message);
    // this.socket.emit("get list conversations at home");
  }
}
// const socket = io("http://localhost:8080", {
//   withCredentials: true,
//   'force new connection': true,
// });
// export const handle_new_message = (callback) => {
//   socket.on("receive message", (msg_data, user_id) => {
//     callback(msg_data, user_id);
//   });
// };
// export const handle_load_all_message_in_room = (callback) => {
//   socket.on("load all message in room", (msg_data, user_id) => {
//     callback(msg_data,user_id);
//   });
// };
export default Socket;
