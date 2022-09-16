import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, getRoomListAction } from "../../stores/actions/RoomAction";
import { findUserAction } from "../../stores/actions/UserAction";
import "./searchbar.scss";

const { Search } = Input;

const Searchbar = () => {
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState({});
  const [isCustomFriendListModalVisible, setIsCustomFriendListModalVisible] =
    useState(false);
  const [chosenUsers, setChosenUsers] = useState([]);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userReducer);

  const handleUserSearch = (values) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(values)) {
      dispatch(findUserAction({ name: "", email: keyword }));
    } else {
      dispatch(findUserAction({ name: keyword, email: "" }));
    }
    setIsCustomFriendListModalVisible(true);
  };
  const handleEraseUser = (item) => {
    let newChosenUser = chosenUsers.filter((item2) => item2.id !== item.id);
    // console.log(newChosenUser);
    setChosenUsers(newChosenUser);
  };
  const handleChoseUser = (e, item) => {
    if (e.target.checked) {
      setChosenUsers(item);
      setChosenUsers([
        ...chosenUsers,
        { id: item._id, username: item.username },
      ]);
    } else {
      let newChosenUser = [...chosenUsers];
      newChosenUser.pop();
      setChosenUsers(newChosenUser);
    }
  };

  const handleOKCustomModal = () => {
    setIsCustomFriendListModalVisible(false);
  };

  //Modal section
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let temp = chosenUsers.map((item) => item.id);
    dispatch(
      createRoom({
        roomname: form.getFieldValue("roomname"),
        friendIds: temp,
        avatar: "b",
      })
    );
    setIsModalVisible(false);
    setIsCustomFriendListModalVisible(false);
    dispatch(getRoomListAction());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsCustomFriendListModalVisible(false);
  };

  return (
    <div className="searchbar d-flex align-items-center justify-content-center">
      <div className="searchbar__container">
        <div
          onClick={() => setIsModalVisible(true)}
          className="searchbar__container__add-friend d-flex align-items-center justify-content-between"
        >
          <PlusOutlined style={{ color: "#040201", fontSize: "16px" }} />
          <p>Create room</p>
        </div>
        <Modal
          title="Create chat room"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Room's name"
              name="roomname"
              value="roomname"
              rules={[
                {
                  required: true,
                  message: "Please input room's name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Friend"
              name="friends"
              rules={[
                {
                  required: true,
                  message: "Please add another user to this room!",
                },
              ]}
            >
              <Search
                className="search-form"
                style={{
                  width: "100%",
                }}
                placeholder="Let's find your friend"
                onChange={(e) => setKeyword(e.target.value)}
                onSearch={handleUserSearch}
              />
              <div className="chosen-user d-flex align-items-center">
                {chosenUsers.length > 0 &&
                  isCustomFriendListModalVisible === false &&
                  chosenUsers?.map((item) => (
                    <span
                      key={item.id}
                      style={{ marginRight: "12px" }}
                      className="d-flex align-items-center chosen-user__container"
                    >
                      <CloseOutlined
                        style={{ fontSize: "15px" }}
                        onClick={() => handleEraseUser(item)}
                      />
                      <p style={{ margin: "0 0 0 6px" }}>{item.username}</p>
                    </span>
                  ))}
              </div>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="You are looking for: ..."
          visible={isCustomFriendListModalVisible}
          // footer={}
          onOk={handleOKCustomModal}
          onClose={() => setIsCustomFriendListModalVisible(false)}
          onCancel={() => setIsCustomFriendListModalVisible(false)}
          className="modal-find-user"
        >
          {userList.map((item) => (
            <Checkbox
              onChange={(e) => handleChoseUser(e, item)}
              key={item?._id}
            >
              <img src="#" alt="" />
              <p>{item?.username}</p>
            </Checkbox>
          ))}
        </Modal>
      </div>
    </div>
  );
};

export default Searchbar;
