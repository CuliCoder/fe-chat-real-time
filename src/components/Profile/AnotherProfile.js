import React, { useEffect, useContext } from "react";
import "./AnotherProfile.scss";
import { ModeContext } from "../../context/mode";
const AnotherProfile = React.memo(({ fullname, avatar, gender }) => {
  const { mode } = useContext(ModeContext);
  return (
    <div className="container-profile">
      <div className="modal fade" id="AnotherProfileModal">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content profile-page">
            <div className="modal-header">
              <div className="modal-title ">
                <div className="fs-5 fw-bold">Profile</div>
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
              <div className="profile">
                <div className="profile-avatar">
                  <div className="avatar">
                    <img
                      src={process.env.REACT_APP_IO_URL + "/Avatar/" + avatar}
                      alt="loading"
                    />
                  </div>
                </div>
                <div className="profile-name fs-5">{fullname}</div>
                <div className="profile-content">
                  <div className="title fs-5 fw-bold">Personal information</div>
                  <div className="content">
                    <div className="infor">
                      <span>Gender</span>
                      <span>{gender}</span>
                    </div>
                    <div className="infor">
                      <span>Birthday</span>
                      <span>hide</span>
                    </div>
                    <div className="infor">
                      <span>Email</span>
                      <span>hide</span>
                      <span></span>
                    </div>
                    <div className="infor">
                      <span>Phone number</span>
                      <span>hide</span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AnotherProfile;
