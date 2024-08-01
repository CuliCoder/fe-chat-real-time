import { login_request, login_failed, login_success } from "../action/login";
const initialState = {
  loading: false,
  error: {},
};
const login_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case login_request:
      return { ...state, loading: action.loading };
    case login_success:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case login_failed:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
};
export default login_Reducer;