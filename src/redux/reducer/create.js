import {
  create_conversation_request,
  create_conversation_success,
} from "../action/create";
const initialState = {
  loading: false,
  data: {},
};
export const create_conversation_reducer = (state = initialState, action) => {
  switch (action.type) {
    case create_conversation_request:
      return {
        ...state,
        loading: true,
        data: {},
      };
    case create_conversation_success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    default:
      return state;
  }
};
