import {
  update_list_conversation_at_home,
  conversation_loading,
  get_list_conversation_found_success,
  create_conversation_success,
} from "../action/conversation";
const initialState = {
  loading: false,
  data: {
    conversations_at_home: [],
    conservations_found: [],
    conversation_current: {},
  },
};
const conservation_reducer = (state = initialState, action) => {
  switch (action.type) {
    case update_list_conversation_at_home:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          conversations_at_home: action.data,
        },
      };
    case conversation_loading:
      return {
        ...state,
        loading: true,
      };
    case get_list_conversation_found_success:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          conservations_found: action.data,
        },
      };
    case create_conversation_success:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          conversation_current: action.data,
        },
      };
    default:
      return state;
  }
};
export default conservation_reducer;
