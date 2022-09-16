import { GET_ROOM_LIST, GET_ROOM_DETAIL } from "../types/RoomTypes";

const initialState = {
  roomList: [],
  roomSelected: null,
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_LIST:
      return { ...state, roomList: action.data };
    case GET_ROOM_DETAIL:
      return { ...state, roomSelected: action.data };
    default:
      return state;
  }
};
