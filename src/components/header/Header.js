import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/catmeme.jpg";
import Logo from "../../assets/Logo (3).jpg";
import { logOutAction } from "../../stores/actions/AuthAction";
import { Modal } from "antd";
import "./header.scss";
import { useDropzone } from "react-dropzone";
import {
  getAvatarAction,
  updateAvatarAction,
} from "../../stores/actions/UserAction";

const Header = () => {
  const [isVisibleSetting, setIsVisibleSetting] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { userInfo } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSettingBtn = () => {
    setIsVisibleSetting(!isVisibleSetting);
  };

  const handleLogoutBtn = () => {
    dispatch(logOutAction());
  };

  const handleOKModal = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = function (e) {
      console.log(e.target.result);
      let param = e.target.result.split(",")[1];
      dispatch(updateAvatarAction({ avatar: param }));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

    setIsVisibleModal(false);
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatarTemp = await dispatch(getAvatarAction());
      setAvatar(`data:image/jpeg;base64,${avatarTemp}`);
    };
    fetchAvatar();
  }, []);

  return (
    <header className="header d-flex justify-content-center align-items-center">
      <div className="header__container container d-flex justify-content-between align-items-center">
        <img src={Logo} alt="" />
        <nav className="header__container__navbar d-flex align-items-center">
          <div className="header__container__navbar__noti d-flex align-items-center justify-content-center">
            <BellOutlined style={{ fontSize: "20px" }} />
          </div>
          <div style={{ position: "relative", zIndex: "1" }}>
            <div
              onClick={handleSettingBtn}
              className="header__container__navbar__setting d-flex align-items-center justify-content-center"
            >
              <SettingOutlined style={{ fontSize: "20px" }} />
            </div>
            <ul
              className={
                isVisibleSetting
                  ? "header__container__navbar__setting__modal"
                  : "header__container__navbar__setting__modal d-none"
              }
            >
              <li
                onClick={handleLogoutBtn}
                className="d-flex align-items-center justify-content-between"
              >
                <LogoutOutlined />
                <p>Logout</p>
              </li>
            </ul>
          </div>
          <div
            onClick={() => setIsVisibleModal(true)}
            className="header__container__navbar__user-icon d-flex justify-content-between align-items-center"
          >
            <p>{userInfo?.username}</p>
            <img src={avatar} alt="" />
          </div>
        </nav>
      </div>
      <Modal
        className="modal d-flex justify-content-center"
        title="Choose an avatar"
        visible={isVisibleModal}
        onOk={handleOKModal}
        onCancel={() => setIsVisibleModal(false)}
      >
        <div
          className="dropzone"
          style={{
            padding: "20px 30px 20px 30px",
            // width: "90%",
            backgroundColor: "#fafafa",
            border: "1px dashed #eeeeee",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p style={{ color: "grey" }}>
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
        <ul style={{ marginTop: "20px" }}>{files}</ul>
      </Modal>
    </header>
  );
};

export default Header;
