import axios from "./configAxios";
export const get_token_io = () => {
    return axios.get("/get-token-io");
}