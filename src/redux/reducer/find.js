import {
  find_user_request,
  find_user_success,
  find_user_close,
  get_list_conversation_success,
  get_list_conversation_request,
} from "../action/find";
// conversation
const initialState_conversation = {
  loading: false,
  data: [],
};
export const get_list_conversation_reducer = (state = initialState_conversation, action) => {
  switch (action.type) {
    case get_list_conversation_request:
      return {
        ...state,
        loading: true,
      };
    case get_list_conversation_success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    default:
      return state;
  }
};
// user
const initialState_user = {
  loading: false,
  data: [],
};
export const find_user_reducer = (state = initialState_user, action) => {
  switch (action.type) {
    case find_user_request:
      return {
        ...state,
        loading: true,
      };
    case find_user_success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case find_user_close:
      return {
        ...state,
        loading: false,
        data: [],
      };
    default:
      return state;
  }
};
