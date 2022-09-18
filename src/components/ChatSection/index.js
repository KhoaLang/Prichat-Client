import {
  EllipsisOutlined,
  FileAddOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  getAllMessages,
  getNewestMessage,
  deleteMessages,
} from "../../stores/actions/MessageAction";
import "./chatsection.scss";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import classNames from "classnames";

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

const listOfOptions = [
  {
    icon: <i className="bx bxs-edit-alt"></i>,
    title: "Customize chat",
    postfix: <i className="bx bx-chevron-right"></i>,
  },
  {
    icon: <i className="bx bxs-bell"></i>,
    title: "Mute notifications",
  },
  {
    icon: <i className="bx bxs-file-find"></i>,
    title: "View media, files, link",
  },
  {
    icon: <i className="bx bx-user-plus"></i>,
    title: "Add people",
  },
  {
    icon: <i className="bx bx-group"></i>,
    title: "Members",
  },
  {
    icon: <i className="bx bxs-minus-circle"></i>,
    title: "Block",
  },
  {
    icon: <i className="bx bxs-error-alt"></i>,
    title: "Report member",
  },
  {
    icon: <i className="bx bx-run"></i>,
    title: "Leave",
  },
];

const rightClickMenu = [{ title: "Copy" }, { title: "Remove" }];

const Chatsection = () => {
  const [content, setContent] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleEmojiModal, setIsVisibleEmojiModal] = useState(false);
  const [isVisibleContextMenu, setIsVisibleContextMenu] = useState(false);
  const [selectedMessContextMenu, setSelectedMessContextMenu] = useState(null);
  const [files, setFiles] = useState("");
  const { roomSelected } = useSelector((state) => state.roomReducer);
  const { messagesList } = useSelector((state) => state.messageReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleCloseContextMenu = () => {
    setIsVisibleContextMenu(false);
  };
  const ref2 = useDetectClickOutside({ onTriggered: handleCloseContextMenu });

  const joinRoom = () => {
    socket.emit("joinRoom", roomSelected?._id);
    setCurrentRoomId(roomSelected?._id);
  };
  const leaveRoom = () => {
    if (currentRoomId !== null) {
      socket.emit("leaveRoom", currentRoomId);
    }
  };

  const handleSubmit = async () => {
    if (content !== "" && content.trim().length > 0) {
      let dataForm = {
        content,
        roomId: roomSelected?._id,
        userId: userInfo.id,
      };
      socket.emit("sendMessage", dataForm);
      setContent("");
    }
  };
  const handleSubmitByEnter = async (e) => {
    if (content !== "" && content.trim().length > 0 && e.key === "Enter") {
      let dataForm = {
        content,
        roomId: roomSelected?._id,
        userId: userInfo.id,
      };
      socket.emit("sendMessage", dataForm);
      setContent("");
    }

    // console.log(typeof files);
  };
  const handleSelectedEmoji = (value) => {
    // console.log(value);
    setContent(content + value.native);
  };

  const handleMessageClick = (e, item) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setIsVisibleContextMenu(!isVisibleContextMenu);
      setSelectedMessContextMenu(item._id);
    }
  };

  const handleClickContextMenu = (item, item2) => {
    if (item.includes("Remove")) {
      dispatch(deleteMessages(item2._id, roomSelected._id));
    } else if (item.includes("Copy")) {
      navigator.clipboard.writeText(item2.content);
    }
  };

  useEffect(() => {
    if (roomSelected !== null) {
      dispatch(getAllMessages(roomSelected?._id));
    }
    leaveRoom();
    joinRoom();
  }, [roomSelected]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", async (content) => {
        // console.log(content);
        if (roomSelected?._id !== null && roomSelected?._id) {
          dispatch(getNewestMessage(content));
        }
      });
    }
  }, [dispatch]);

  return (
    <section className="chatsection d-flex flex-column justify-content-between">
      <div className="chatsection__screen">
        <header className="chatsection__screen__header d-flex align-items-center justify-content-between">
          <div className="chatsection__screen__header__bg"></div>
          <div className="chatsection__screen__header__title d-flex align-items-center justify-content-between">
            {/* <img src="#" alt="" /> */}
            <h4>{roomSelected?.roomname}</h4>
            {roomSelected !== null && (
              <EllipsisOutlined
                onClick={() => setIsVisibleModal(!isVisibleModal)}
                style={{ fontSize: "25px", zIndex: "2" }}
              />
            )}
            <ul
              className={
                isVisibleModal
                  ? "chatsection__screen__header__modal"
                  : "d-none chatsection__screen__header__modal"
              }
            >
              {listOfOptions.map((item, idx) => (
                <li key={idx} className="d-flex align-items-center">
                  {item.icon}
                  <p>{item.title}</p>
                  {item.postfix && <>{item.postfix}</>}
                  {idx === 0 && (
                    <span className="sub-options">
                      <li>
                        <i className="bx bxs-image"></i>
                        <p>Change theme</p>
                      </li>
                      <li>
                        <i className="bx bxs-edit-alt"></i>
                        <p>Chang nickname</p>
                      </li>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </header>
        <div className="chatsection__screen__main d-flex flex-column">
          {messagesList?.map((item) => (
            <span
              ref={ref2}
              className={
                item?.user?._id === userInfo.id
                  ? "chatsection__screen__main__mine d-flex flex-column"
                  : "chatsection__screen__main__their d-flex flex-column"
              }
              key={item?._id}
              onClick={(e) => handleMessageClick(e, item)}
              onContextMenu={(e) => handleMessageClick(e, item)}
            >
              <p>{item?.user?.username}</p>
              <div>
                <span className="inner-chat-content">{item?.content}</span>
                <ul
                  className={classNames({
                    "context-menu":
                      isVisibleContextMenu &&
                      selectedMessContextMenu === item._id &&
                      item.user._id === userInfo.id,
                    "context-menu-their":
                      isVisibleContextMenu &&
                      selectedMessContextMenu === item._id &&
                      item.user._id !== userInfo.id,
                    "d-none":
                      !isVisibleContextMenu ||
                      selectedMessContextMenu !== item._id,
                  })}
                >
                  {rightClickMenu.map((item2, idx) => (
                    <li
                      onClick={() => handleClickContextMenu(item2.title, item)}
                      key={idx}
                    >
                      {item2.title}
                    </li>
                  ))}
                </ul>
              </div>
            </span>
          ))}
          <div className="dummy-div-for-bottom-scroll" ref={ref}></div>
        </div>
      </div>
      <div className="chatsection__typing d-flex justify-content-between align-items-center">
        <div className="chatsection__typing__outline-input d-flex justify-content-between align-items-center">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleSubmitByEnter}
          />
          {/* <input type="file" /> */}
          <div className="chatsection__typing__outline-input__icon">
            <FileAddOutlined style={{ fontSize: "20px" }} />
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files[0])}
              // value={files}
            />
          </div>
          <div className="chatsection__typing__outline-input__emoji-container">
            <div className="chatsection__typing__outline-input__icon">
              <SmileOutlined
                onClick={() => setIsVisibleEmojiModal(!isVisibleEmojiModal)}
                style={{ fontSize: "20px" }}
              />
            </div>
            <span
              className="chatsection__typing__outline-input__emoji-container__emoji-picker"
              style={
                isVisibleEmojiModal
                  ? { zIndex: "1", opacity: "1" }
                  : { pointerEvents: "none", opacity: "0" }
              }
            >
              <Picker
                // onClickOutside={() => setIsVisibleEmojiModal(false)}
                data={data}
                onEmojiSelect={handleSelectedEmoji}
              />
            </span>
          </div>
        </div>
        <div
          className="chatsection__typing__outline-input__icon"
          onClick={handleSubmit}
        >
          <SendOutlined />
        </div>
      </div>
    </section>
  );
};

export default Chatsection;
