import React, { useEffect, useState, useMemo, useContext } from "react";
import { format_birthday } from "../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { updateInformation, clearError } from "../../redux/action/user";
import { ModeContext } from "../../context/mode";
import "./EditProfile.scss";
const EditProfile = React.memo(({ userInfo, goBack }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [infor, setInfor] = useState({
    fullname: "",
    gender: "",
    DOB: "",
  });
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setInfor({
        fullname: userInfo.fullname,
        gender: userInfo.gender,
        DOB: userInfo.DOB,
      });
    }
    return () => {
      dispatch(clearError());
    };
  }, []);
  const changInfor = (e) => {
    setInfor({ ...infor, [e.target.name]: e.target.value });
  };
  const formattedBirthday = useMemo(() => {
    return infor.DOB === "" ? "" : format_birthday(infor.DOB);
  }, [infor.DOB]);
  const handleUpdate = () => {
    dispatch(updateInformation(infor));
  };
  const { mode } = useContext(ModeContext);
  return (
    <div className="modal-content edit-page">
      <div className="modal-header">
        <button className="btn-back" onClick={goBack}>
          <img
            src={mode === "true" ? "img/left-dark-mode.png" : "img/left.png"}
          ></img>
        </button>
        <div className="modal-title ">
          <div className="fs-5 fw-bold">Edit your personal information</div>
        </div>
        <button
          id="close-modal"
          type="button"
          className={
            mode === "true" ? "btn-close btn-close-white" : "btn-close"
          }
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div className="modal-body">
        <div className="edit-profile-page">
          <div className="fullname">
            <span>Display name</span>
            <input
              name="fullname"
              type="text"
              className={
                !error.fullname ? "form-control" : "form-control is-invalid"
              }
              placeholder="Display name"
              value={infor.fullname ? infor.fullname : ""}
              onChange={changInfor}
              required
            />
          </div>
          <span className="title-Personal-information fs-5 fw-bold">
            Personal information
          </span>
          <div className="gender">
            <div className="radio-container">
              <div className="male-btn-check">
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
                  checked={infor.gender ? infor.gender === "Male" : false}
                />
                <label
                  htmlFor="male"
                  className="form-check-label form-check-label fs-5"
                >
                  Male
                </label>
              </div>
              <div className="female-btn-check">
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
                  checked={infor.gender ? infor.gender === "Female" : false}
                />
                <label
                  htmlFor="female"
                  className="form-check-label form-check-label fs-5"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="DOB">
            <label htmlFor="DateOfBirth">Birthday</label>
            <input
              name="DOB"
              type="date"
              className={
                !error.DOB ? "form-control" : "form-control is-invalid"
              }
              id="DateOfBirth"
              value={formattedBirthday}
              onChange={changInfor}
              required
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
});
export default EditProfile;
