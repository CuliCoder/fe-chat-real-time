import axios from "../../services/configAxios";
import { getCsrfToken } from "../../utils/getCSRF";
// conversation
export const create_conversation_request = "create_conversation_request";
export const create_conversation_success = "create_conversation_success";

const create_conversation_Request = () => {
  return {
    type: create_conversation_request,
  };
};
const create_conversation_Success = (data) => {
  return {
    type: create_conversation_success,
    data,
  };
};
export const create_conversation = (user_two) => {
  return async (dispatch) => {
    dispatch(create_conversation_Request());
    const get_user = await axios.get("/get-user-by-id", {
      params: { id: user_two },
    });
    if (get_user.status !== 200) {
      return;
    }
    console.log(get_user);
    const fullname = get_user.data.data.fullname;
    console.log("csrf", getCsrfToken());
    await axios
      .post("/create-conversation", { user_two, _csrf: getCsrfToken() })
      .then((res) => {
        const conversation_id = res.data.data.id;
        dispatch(
          create_conversation_Success({ conversation_id, user_two, fullname })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
