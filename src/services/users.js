import axios from "./configAxios";
const create_user = (firstname, surname, email, tel, password, gender, DOB) => {
  return axios.post("/create-user", {
    firstname: firstname,
    surname: surname,
    email: email,
    tel: tel,
    password: password,
    gender: gender,
    DOB: DOB,
  });
};
const get_list_user = () => {
  return axios.get("/");
};
const get_user_by_id = (id) => {
  axios.get("/get-user-by-id", { params: { id: id } }).then((res) => {
    return res.data.fullname;
  });
};
export { create_user, get_list_user,get_user_by_id };
