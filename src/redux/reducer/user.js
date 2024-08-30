import {
  get_information_success,
  get_information_failed,
  update_information_success,
  update_information_failed,
  update_avatar_success,
  update_avatar_failed,
  clear_error,
  get_information_loading,
  update_information_loading,
  update_avatar_loading,
} from "../action/user";
const initialState = {
  get_information_loading: false,
  update_information_loading: false,
  update_avatar_loading: false,
  data: {
    userInfo: null,
  },
  error: {},
};
const user_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case get_information_loading:
      return { ...state, get_information_loading: true };
    case update_information_loading:
      return { ...state, update_information_loading: true };
    case update_avatar_loading:
      return { ...state, update_avatar_loading: true };
    case get_information_success:
      return {
        ...state,
        get_information_loading: false,
        data: {
          ...state.data,
          userInfo: action.userInfo,
        },
      };
    case get_information_failed:
      return {
        ...state,
        get_information_loading: false,
        data: {
          ...state.data,
          userInfo: null,
        },
      };
    case update_information_success:
      return {
        ...state,
        get_information_loading: false,
      };
    case update_information_failed:
      return {
        ...state,
        update_information_loading: false,
        error: action.error,
      };
    case update_avatar_success:
      return {
        ...state,
        update_avatar_loading: false,
      };
    case update_avatar_failed:
      return {
        ...state,
        update_avatar_loading: false,
      };
    case clear_error:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};
export default user_Reducer;
