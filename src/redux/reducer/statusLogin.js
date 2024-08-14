import { isLogin, isLogout, checkLoginReq } from "../action/statusLogin";
const initState = {
  loading: false,
  userInfo: null,
  isLogin: false,
};
const statusLogin = (state = initState, action) => {
  switch (action.type) {
    case isLogin:
      return {
        userInfo: action.userInfo,
        loading: false,
        isLogin: true,
      };
    case isLogout:
      return {
        userInfo: null,
        isLogin: false,
        loading: false,
      };
    case checkLoginReq:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default statusLogin;
