import { success } from "toastr";
import {
  register_request,
  register_success,
  register_failed,
} from "../action/register";
const initialState = {
  loading: false,
  error: {},
};
const register_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case register_request:
      return { ...state, loading: action.loading };
    case register_success:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case register_failed:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
};
export default register_Reducer;
