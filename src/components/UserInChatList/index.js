import { useDispatch } from "react-redux";
import { setSelectedRoom } from "../../stores/actions/RoomAction";
import "./userInChatList.scss";

const UserInChatList = (props) => {
  const { active, item } = props;
  const dispatch = useDispatch();

  const handleChatRoomList = () => {
    dispatch(setSelectedRoom(item));
  };

  return (
    <div
      className="userinchatlist d-flex align-items-center"
      onClick={handleChatRoomList}
    >
      {/* <img src={avatar} alt="" /> */}
      <div className="userinchatlist__user-status">
        <p className="userinchatlist__user-status__name">{item.roomname}</p>
        <p
          style={active ? { color: "#00ed64" } : { color: "red" }}
          className="userinchatlist__user-status__current-status"
        >
          {active ? "Activate" : "Out of order"}
        </p>
      </div>
      {/* <div className="userinchatlist__number-unseen-messages">
        <PopupNumbers number={3} />
      </div> */}
      <div></div>
    </div>
  );
};

export default UserInChatList;
