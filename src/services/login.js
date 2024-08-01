import axios from "./configAxios";
const islogin = async () => {
  return axios.get("/is-login");
};
export default islogin;
