import { createStore, combineReducers, applyMiddleware } from "redux";
import register_Reducer from "../reducer/register";
import login_Reducer from "../reducer/login";
import statusLogin from "../reducer/statusLogin";
import {
  find_user_reducer,
  get_list_conversation_reducer,
} from "../reducer/find";
import { create_conversation_reducer } from "../reducer/create";
import message_reducer from "../reducer/message";
import conservation_reducer from "../reducer/conversation";
import loading_reducer from "../reducer/loading";
const rootReducer = combineReducers({
  register: register_Reducer,
  login: login_Reducer,
  statusLogin: statusLogin,
  find_user: find_user_reducer,
  get_list_conversation: get_list_conversation_reducer,
  create_conversation: create_conversation_reducer,
  message: message_reducer,
  conversation: conservation_reducer,
  loading: loading_reducer,
});
const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};
export default createStore(rootReducer, applyMiddleware(asyncMiddleware));
