import { new_message, load_all_message } from "../action/message";

const initialState = {
  data: {
    message: [],
    user_id: null,
  },
};
const message_reducer = (state = initialState, action) => {
  switch (action.type) {
    case new_message:
      return {
        ...state,
        data: {
          message: [action.message, ...state.data.message],
          user_id: state.data.user_id,
        },
      };
    case load_all_message:
      return {
        ...state,
        data: {
          message: action.data.message.reverse(),
          user_id: action.data.user_id,
        },
      };
    default:
      return state;
  }
};
export default message_reducer;
