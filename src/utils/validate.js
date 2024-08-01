export const checkEmail = (str) => {
  let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (rgEmail.test(str)) {
    return true;
  }
  return false;
};
export const checkTel = (str) => {
  let rgTel = /^(0[1-9]{1}[0-9]{8,9})$/;
  if (rgTel.test(str)) {
    return true;
  }
  return false;
};
export const checkRegisterInput = (infor) => {
  let error = {};
  if (!infor.firstname) {
    error.firstname = "First name is invalid!";
    return error;
  }
  if (!infor.surname) {
    error.surname = "Surname is invalid!";
    return error;
  }
  if (!infor.emailOrtel || (!infor.email && !infor.tel)) {
    error.emailOrtel = "Email address or mobile number is invalid!";
    return error;
  }
  let rgPw = /^(?=.*[A-Z])(?=(?:.*\d){8,}).*$/;
  if (!infor.password || !rgPw.test(infor.password)) {
    error.password =
      "Password must start with an uppercase letter and contain at least 8 digits.";
    return error;
  }
  if (!infor.DOB) {
    error.DOB = "Date of birth is invalid!";
    return error;
  }
  let date1 = new Date(infor.DOB);
  let today = new Date();
  if (today.getFullYear() - date1.getFullYear() < 16) {
    error.DOB = "You must be 16 years or older to participate.";
    return error;
  }
  if (!infor.gender) {
    error.gender = "Gender is invalid!";
    return error;
  }
  return error;
};
export const checkLoginInput = (infor) => {
  let error = {};
  if (!infor.account) {
    error.account = "Missing email address or phone number";
    return error;
  }
  let rgTel = /^(0[1-9]{1}[0-9]{8,9})$/;
  let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!rgEmail.test(infor.account) && !rgTel.test(infor.account)) {
    error.account = "Email address or phone number is invalid";
    return error;
  }
  if (!infor.password) {
    error.password = "Password is invalid!";
    return error;
  }
  return error;
};
