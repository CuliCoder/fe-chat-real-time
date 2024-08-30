import "./Signup.scss";
import { useEffect, useState, memo } from "react";
import { checkEmail, checkTel } from "../../utils/validate";
import { useSelector, useDispatch } from "react-redux";
import register from "../../redux/action/register";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
const Signup = () => {
  console.log("Signup");
  const error = useSelector((state) => state.register.error);
  const dispatch = useDispatch();
  const [infor, setInfor] = useState({
    emailOrtel: "",
    email: "",
    tel: "",
    firstname: "",
    surname: "",
    password: "",
    gender: "",
    DOB: "",
  });
  const initInfor = {
    emailOrtel: "",
    email: "",
    tel: "",
    firstname: "",
    surname: "",
    password: "",
    gender: "",
    DOB: "",
  };
  const changInfor = (e) => {
    setInfor({ ...infor, [e.target.name]: e.target.value });
  };
  const setEmail_Tel = (e) => {
    const value = e.target.value;
    let email = "";
    let tel = "";
    if (checkEmail(value)) {
      email = value;
      tel = "";
    } else if (checkTel(value)) {
      tel = value;
      email = "";
    } else {
      email = "";
      tel = "";
    }
    setInfor({ ...infor, emailOrtel: value, email: email, tel: tel });
  };
  const handleInput = (e) => {
    e.preventDefault();
    dispatch(register(infor));
  };
  useEffect(() => {
    if (error.success) {
      toast.success(Object.values(error)[0]);
      document.getElementById("close-modal").click();
      setInfor(initInfor);
      document.getElementById("form_signup").reset();
    } else {
      toast.error(Object.values(error)[0]);
    }
  }, [error]);

  return (
    <>
      <form id="form_signup">
        <div className="modal fade " id="SignUpModal">
          <div className="modal-dialog modal-dialog-center">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title d-flex flex-column">
                  <h1 className=" fs-3 fw-bold">Sign Up</h1>
                  <h3 className=" fs-5 fw-normal">It's quick and easy.</h3>
                </div>
                <button
                  id="close-modal"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body d-grid gap-3">
                <div className="input-Name d-flex gap-3">
                  <input
                    name="firstname"
                    type="text"
                    className={
                      !error.firstname
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="First name"
                    value={infor.firstname}
                    onChange={changInfor}
                    required
                  />
                  <input
                    name="surname"
                    type="text"
                    className={
                      !error.surname
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Surnname"
                    value={infor.surname}
                    onChange={changInfor}
                    required
                  />
                </div>

                <input
                  name="emailOrtel"
                  type="text"
                  id="EmailOrPhoneNumber"
                  className={
                    !error.emailOrtel
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Mobile number or email address"
                  value={infor.emailOrtel}
                  onChange={setEmail_Tel}
                  required
                />
                <input
                  name="password"
                  type="password"
                  className={
                    !error.password ? "form-control" : "form-control is-invalid"
                  }
                  placeholder="New password"
                  value={infor.password}
                  onChange={changInfor}
                  required
                />
                <div className="form-floating">
                  <input
                    name="DOB"
                    type="date"
                    className={
                      !error.DOB ? "form-control" : "form-control is-invalid"
                    }
                    id="DateOfBirth"
                    value={infor.DOB}
                    onChange={changInfor}
                    required
                  />
                  <label htmlFor="DateOfBirth">Date of birth</label>
                </div>
                <div className="Gender">
                  <p className="text-black-50 ">Gender</p>
                  <div className="form-check form-check-inline rounded d-inline-flex gap-1 align-items-center">
                    <input
                      type="radio"
                      id="male"
                      className={
                        !error.gender
                          ? "form-check-input fs-6 "
                          : "form-check-input fs-6 is-invalid"
                      }
                      name="gender"
                      value="Male"
                      onChange={changInfor}
                      required
                    />
                    <label
                      htmlFor="male"
                      className="form-check-label form-check-label fs-5"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline rounded d-inline-flex gap-1 align-items-center">
                    <input
                      type="radio"
                      id="female"
                      className={
                        !error.gender
                          ? "form-check-input fs-6 "
                          : "form-check-input fs-6 is-invalid"
                      }
                      name="gender" 
                      value="Female"
                      onChange={changInfor}
                      required
                    />
                    <label htmlFor="female" className="form-check-label fs-5">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success px-5"
                  onClick={handleInput}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default memo(Signup);
