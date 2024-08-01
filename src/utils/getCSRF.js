import Cookies from "react-cookies";
import axios from "../services/configAxios";
// export const getCsrfToken = () => {
//   return Cookies.load("_csrf");
// };
export const getCsrfToken = () => {
  return axios.get("/get-csrf");
}
