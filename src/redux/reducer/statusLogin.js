import { isLogin, isLogout } from "../action/statusLogin";
const initState = {
  isLogin: false,
};
const statusLogin = (state = initState, action) => {
  switch (action.type) {
    case isLogin:
      return {
        isLogin: true,
      };
    case isLogout:
      return {
        isLogin: false,
      };
    default:
      return state;
  }
};
export default statusLogin;
