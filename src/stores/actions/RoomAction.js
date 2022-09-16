import { roomService } from "../../services/RoomService";
import { GET_ROOM_DETAIL, GET_ROOM_LIST } from "../types/RoomTypes";

export const getRoomListAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await roomService.getListOfRoom();
      dispatch({ type: GET_ROOM_LIST, data: data.payload.rooms });
    } catch (err) {
      console.error(err);
    }
  };
};
// export const getRoomsMessages = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await roomService.getRoomsDetailById();
//       dispatch({ type: GET_ROOM_DETAIL, data: data.payload.roomMessages });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

// data: {
//   roomname: String,
//   avatar: String (Blob),
//   friendIds: Array of UserIds
// }
export const createRoom = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await roomService.newRoom(form);
      // console.log(data);
      dispatch(getRoomListAction());
    } catch (err) {
      console.error(err);
    }
  };
};

export const setSelectedRoom = (roomObj) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: GET_ROOM_DETAIL, data: roomObj });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteRoom = (roomId) => {
  return async (dispatch) => {
    try {
      const {temp} = await roomService.deleteRoom(roomId)
      dispatch(getRoomListAction())
    } catch (err) {
      console.error(err);
    }
  };
} 
export const leaveRoom = (roomId) => {
  return async (dispatch) => {
    try {
      const {temp} = await roomService.leaveRoom(roomId)
    } catch (err) {
      console.error(err);
    }
  };
} 