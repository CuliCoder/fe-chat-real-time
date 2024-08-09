import { new_message, load_all_message_success,message_loading } from "../action/message";

const initialState = {
  loading: false,
  data: {
    messages: [],
    user_id: null,
  },
};
const message_reducer = (state = initialState, action) => {
  switch (action.type) {
    case new_message:
      return {
        ...state,
        loading: false,
        data: {
          messages: [action.message, ...state.data.messages],
          user_id: state.data.user_id,
        },
      };
    case load_all_message_success:
      return {
        ...state,
        loading: false,
        data: {
          messages: action.data.messages.reverse(),
          user_id: action.data.user_id,
        },
      };
    case message_loading:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default message_reducer;
