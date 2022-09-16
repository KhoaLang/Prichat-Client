import "./chatlist.scss";
import img from "../../assets/catmeme.jpg";
import UserInChatList from "../UserInChatList";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListAction } from "../../stores/actions/RoomAction";
import { useEffect } from "react";

const ChatList = () => {
  const dispatch = useDispatch();
  const { roomList } = useSelector((state) => state.roomReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const acstk = localStorage.getItem(`${process.env.REACT_APP_TOKEN}`);
    if (acstk !== null) {
      dispatch(getRoomListAction());
    }
  }, []);

  return (
    <section className="chatlist">
      {roomList?.map(
        (item, idx) =>
          item && <UserInChatList key={item?._id} item={item} active={true} />
      )}
    </section>
  );
};

export default ChatList;
