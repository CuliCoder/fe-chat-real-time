import React, { useRef, useState, useContext } from "react";
import "./UpdateAvt.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../redux/action/user";
import { ModeContext } from "../../context/mode";
const UpdateAvt = React.memo(({ goBack, avatar }) => {
  const fileInputRef = useRef(null);
  const [avatarCurrent, setAvatarCurrent] = useState(avatar);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const handleUpdateAvt = () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    dispatch(updateAvatar(imageFile));
  };
  const select_avt = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please upload an image file");
      return;
    }
    setAvatarCurrent(URL.createObjectURL(file));
    setImageFile(file);
  };
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  const { mode } = useContext(ModeContext);
  return (
    <div className="modal-content update-avt-page">
      <div className="modal-header">
        <button className="btn-back" onClick={goBack}>
          <img
            src={mode === "true" ? "img/left-dark-mode.png" : "img/left.png"}
          ></img>
        </button>
        <div className="modal-title ">
          <div className="title fs-5 fw-bold">Update avatar</div>
        </div>
        <button
          id="close-modal"
          type="button"
          data-bs-dismiss="modal"
          className={
            mode === "true" ? "btn-close btn-close-white" : "btn-close"
          }
        ></button>
      </div>
      <div className="modal-body update-avt-container">
        <input type="file" ref={fileInputRef} onChange={select_avt}></input>
        <button
          type="button"
          onClick={handleFileButtonClick}
          className="btn-upload-avt"
        >
          <img
            src={mode === "true" ? "img/image-dark-mode.png" : "img/image-.png"}
          />
          <span>Upload from PC</span>
        </button>
        <div className="avatar">
          <img src={avatarCurrent} alt="loading" />
        </div>
        <span className="title-avatar">My avatar</span>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateAvt}
        >
          Update
        </button>
      </div>
    </div>
  );
});
export default UpdateAvt;
