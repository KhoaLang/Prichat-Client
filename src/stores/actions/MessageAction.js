import { messageService } from "../../services/MessageService";

export const createNewMessage = (temp, socket, roomSelectedId, content) => {
  return async (dispatch) => {
    try {
      await messageService.newMessage(temp);

      socket.emit("sendMessage", { roomId: roomSelectedId, content });

      dispatch(getAllMessages(temp.roomId));
    } catch (err) {
      console.error(err);
    }
  };
};
export const getAllMessages = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await messageService.getAllMessagesByRoomId(id);
      // console.log(data);
      dispatch({ type: "GET_MESSAGE_LIST", data: data.payload.messages });
    } catch (err) {
      console.error(err);
    }
  };
};
export const getNewestMessage = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await messageService.getLastestMessage(id);
      dispatch({
        type: "GET_UPDATED_LIST",
        data: data.payload.lastestMess,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
export const deleteMessages = (messageId, roomId) => {
  //This function is for room which have more than 3 people
  return async (dispatch) => {
    try {
      await messageService.deleteMessage(messageId);

      dispatch(getAllMessages(roomId));
    } catch (err) {
      console.error(err);
    }
  };
};
