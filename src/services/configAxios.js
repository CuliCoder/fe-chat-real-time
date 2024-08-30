import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // const csrfToken = getCsrfToken();
    // if (csrfToken) {
    //   config.headers['X-CSRF-Token'] = csrfToken;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.config.url === "/refresh-token" ||
      error.config.url === "/login" ||
      error.config.url === "/create-user" 
      // error.config.url === "/is-login"
    ) {
      return Promise.reject(error);
    }
    if (error.response.data.error === 2) {
      return Promise.reject(error);
    }
    if (error.response.data.error === 1) {
      return new Promise((resolve, reject) => {
        instance
          .post("/refresh-token")
          .then((response) => {
            resolve(instance(error.config));
          })
          .catch((error) => {
            // window.location.href = "/ccc";
            reject(error);
          });
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
