import { createStore, combineReducers, applyMiddleware } from "redux";
import register_Reducer from "../reducer/register";
import login_Reducer from "../reducer/login";
import statusLogin from "../reducer/statusLogin";
import message_reducer from "../reducer/message";
import conservation_reducer from "../reducer/conversation";
import loading_reducer from "../reducer/socket_IO";
import logout from "../reducer/logout";
import user from "../reducer/user";
const rootReducer = combineReducers({
  register: register_Reducer,
  login: login_Reducer,
  statusLogin: statusLogin,
  message: message_reducer,
  conversation: conservation_reducer,
  Socket: loading_reducer,
  logout: logout,
  user: user,
});
const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};
export default createStore(rootReducer, applyMiddleware(asyncMiddleware));
