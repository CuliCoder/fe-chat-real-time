import { toast } from "react-toastify";
import { checkEditProfileInput } from "../../utils/validate";
import axios from "../../services/configAxios";
import { getCsrfToken } from "../../utils/getCSRF";
export const user_request = "user_REQUEST";
export const get_information_success = "GET_INFORMATION_SUCCESS";
export const get_information_failed = "GET_INFORMATION_FAILED";
export const get_information_loading = "GET_INFORMATION_LOADING";
const get_information_loading_action = () => {
  return {
    type: get_information_loading,
  };
}
const get_information_success_action = (userInfo) => {
  return {
    type: get_information_success,
    userInfo,
  };
};
const get_information_failed_action = () => {
  return {
    type: get_information_failed,
  };
};
export const getInformation = () => {
  return async (dispatch) => {
    dispatch(get_information_loading_action());
    try {
      const response = await axios.get("/getmyprofile");
      if (response.status === 200) {
        dispatch(get_information_success_action(response.data.data));
      }
    } catch (err) {
      dispatch(get_information_failed_action());
      toast.error(err.response.data.message);
    }
  };
};
export const update_information_success = "UPDATE_INFORMATION_SUCCESS";
export const update_information_failed = "UPDATE_INFORMATION_FAILED";
export const update_information_loading = "UPDATE_INFORMATION_LOADING";
const update_information_loading_action = () => {
  return {
    type: update_information_loading,
  };
}
const update_information_success_action = (message) => {
  toast.success(Object.values(message)[0]);
  return {
    type: update_information_success,
  };
};
const update_information_failed_action = (error) => {
  toast.error(Object.values(error)[0]);
  return {
    type: update_information_failed,
    error,
  };
};

export const updateInformation = (data) => {
  return async (dispatch) => {
    const error = checkEditProfileInput(data);
    if (Object.keys(error).length > 0) {
      dispatch(update_information_failed_action(error));
      return;
    }
    dispatch(update_information_loading_action());
    try {
      const get_csrf = await getCsrfToken();
      if (get_csrf.status !== 200) {
        return;
      }
      const response = await axios.post("/updateprofile", {
        fullname: data.fullname,
        gender: data.gender,
        DOB: data.DOB,
        _csrf: get_csrf.data.csrfToken,
      });
      if (response.status === 200) {
        dispatch(update_information_success_action(response.data.message));
        dispatch(getInformation());
      }
    } catch (err) {
      dispatch(update_information_failed_action(err.response.data.message));
    }
  };
};
export const clear_error = "CLEAR_ERROR";
export const clearError = () => {
  return {
    type: clear_error,
  };
};
export const update_avatar_success = "UPDATE_AVATAR_SUCCESS";
export const update_avatar_failed = "UPDATE_AVATAR_FAILED";
export const update_avatar_loading = "UPDATE_AVATAR_LOADING";
const update_avatar_loading_action = () => {
  return {
    type: update_avatar_loading,
  };
}
const update_avatar_success_action = (message) => {
  toast.success(message);
  return {
    type: update_avatar_success,
  };
};
const update_avatar_failed_action = (error) => {
  toast.error(error);
  return {
    type: update_avatar_failed,
  };
};
export const updateAvatar = (file) => {
  return async (dispatch) => {
    dispatch(update_avatar_loading_action());
    try {
      const get_csrf = await getCsrfToken();
      if (get_csrf.status !== 200) {
        return;
      }
      const formData = new FormData();
      formData.append("Avatar", file);
      const response = await axios.post("/uploadAvatar", formData, {
        headers: {
          "x-csrf-token": get_csrf.data.csrfToken,
        },
      });
      if (response.status === 200) {
        dispatch(update_avatar_success_action(response.data.message));
      }
    } catch (err) {
      dispatch(update_avatar_failed_action(err.response.data.message));
    }
  };
};
