import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { getInformation } from "../../redux/action/user";
import { format_birthday } from "../../utils/format";
import EditProfile from "./EditProfile";
import UpdateAvt from "./UpdateAvt";
import { ModeContext } from "../../context/mode";
const Profile = React.memo(() => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [userInfo, setUserInfo] = useState(null);
  const [goEditProfile, setGoEditProfile] = useState(false);
  const [goUpdateAvt, setGoUpdateAvt] = useState(false);
  useEffect(() => {
    const modal = document.querySelector("#ProfileModal");
    modal.addEventListener("hidden.bs.modal", () => {
      setGoEditProfile(false);
      setGoUpdateAvt(false);
    });
  }, []);
  const handleGoEdit = () => {
    setGoEditProfile(true);
  };
  const handleGoUpdateAvt = () => {
    setGoUpdateAvt(true);
  };
  const goBack = useCallback(() => {
    setGoEditProfile(false);
    setGoUpdateAvt(false);
  }, []);
  useEffect(() => {
    dispatch(getInformation());
  }, []);
  useEffect(() => {
    if (user.userInfo) {
      setUserInfo({
        ...user.userInfo,
        avatar:
          process.env.REACT_APP_IO_URL + "/Avatar/" + user.userInfo.avatar,
      });
    }
  }, [user.userInfo]);
  const formattedBirthday = useMemo(() => {
    return userInfo ? format_birthday(userInfo.DOB) : "loading";
  }, [userInfo]);
  const { mode } = useContext(ModeContext);
  return (
    <div className="container-profile">
      <div className="modal fade" id="ProfileModal">
        <div className="modal-dialog modal-dialog-center">
          {goEditProfile && <EditProfile userInfo={userInfo} goBack={goBack} />}
          {goUpdateAvt && (
            <UpdateAvt avatar={userInfo.avatar} goBack={goBack} />
          )}
          <div
            className={
              goEditProfile || goUpdateAvt
                ? "modal-content profile-page d-none"
                : "modal-content profile-page"
            }
          >
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
                    <img src={userInfo ? userInfo.avatar : ""} alt="loading" />
                    <div
                      className="btn-edit-avatar"
                      onClick={handleGoUpdateAvt}
                    >
                      <img src="img/photography.png" />
                    </div>
                  </div>
                </div>
                <div className="profile-name fs-5">
                  {userInfo ? userInfo.fullname : "loading"}
                  <img src="img/pen.png" onClick={handleGoEdit} />
                </div>
                <div className="profile-content">
                  <div className="title fs-5 fw-bold">Personal information</div>
                  <div className="content">
                    <div className="infor">
                      <span>Gender</span>
                      <span>{userInfo ? userInfo.gender : "loading"}</span>
                    </div>
                    <div className="infor">
                      <span>Birthday</span>
                      <span>{formattedBirthday}</span>
                    </div>
                    <div className="infor">
                      <span>Email</span>
                      <span>
                        {userInfo
                          ? userInfo.email
                            ? userInfo.email
                            : "none"
                          : "loading"}
                      </span>
                    </div>
                    <div className="infor">
                      <span>Phone number</span>
                      <span>
                        {userInfo
                          ? userInfo.tel
                            ? userInfo.tel
                            : "none"
                          : "loading"}
                      </span>
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
export default Profile;
