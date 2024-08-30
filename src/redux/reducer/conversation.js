import {
  update_list_conversation_at_home,
  get_list_conversation_found_success,
  create_conversation_success,
  leave_conversation,
  close_conversation_found,
  get_list_Conversation_at_home_loading,
  get_list_Conversation_found_loading,
  create_conversation_loading
} from "../action/conversation";
const initialState = {
  conversation_at_home_loading: false,
  conversation_found_loading: false,
  conversation_create_loading: false,
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
        conversation_at_home_loading: false,
        data: {
          ...state.data,
          conversations_at_home: action.data,
        },
      };
    case get_list_Conversation_at_home_loading:
      return {
        ...state,
        conversation_at_home_loading: true,
      };
    case get_list_Conversation_found_loading:
      return {
        ...state,
        conversation_found_loading: true,
      };
    case create_conversation_loading:
      return {
        ...state,
        conversation_create_loading: true,
      };
    case get_list_conversation_found_success:
      return {
        ...state,
        conversation_found_loading: false,
        data: {
          ...state.data,
          conservations_found: action.data,
        },
      };
    case close_conversation_found:
      return {
        ...state,
        data: {
          ...state.data,
          conservations_found: [],
        },
      };
    case create_conversation_success:
      return {
        ...state,
        conversation_create_loading: false,
        data: {
          ...state.data,
          conversation_current: action.data,
        },
      };
    case leave_conversation:
      return {
        ...state,
        data: {
          ...state.data,
          conversation_current: {},
        },
      };
    default:
      return state;
  }
};
export default conservation_reducer;
