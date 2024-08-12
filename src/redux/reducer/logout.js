import { logout_request,logout_success } from "../action/logout";
const initialState = {
  loading: false,
};
const logout = (state = initialState, action) => {
  switch (action.type) {
    case logout_request:
      return {
        ...state,
        loading: true,
      };
    case logout_success:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default logout;