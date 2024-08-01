import Cookies from "react-cookies";
export const getCsrfToken = () => {
  return Cookies.load("_csrf");
};
