import { isLogin, isLogout, checkLoginReq } from "../action/statusLogin";
const initState = {
  isLogin: false,
  loading: false,
};
const statusLogin = (state = initState, action) => {
  switch (action.type) {
    case isLogin:
      return {
        isLogin: true,
        loading: false,
      };
    case isLogout:
      return {
        isLogin: false,
        loading: false,
      };
    case checkLoginReq:
      return {
        isLogin: false,
        loading: true,
      };
    default:
      return state;
  }
};
export default statusLogin;
