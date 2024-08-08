import axios from "../services/configAxios";

export const getCsrfToken = () => {
  return axios.get("/get-csrf");
}
