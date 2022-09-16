import { baseService } from "./BaseService";

export class RoomService extends baseService {
  getListOfRoom = () => {
    return this.get("/api/rooms/");
  };
  getRoomsDetailById = (id) => {
    return this.get(`/api/rooms`, { params: { roomId: id } });
  };
  newRoom = (data) => {
    return this.post("/api/rooms/new", data);
  };
  deleteRoom = (data) => {
    return this.delete(`/api/rooms/${data}`);
  };
  leaveRoom = (data) => {
    return this.delete(`/api/rooms/leave/${data}`);
  };
}

export const roomService = new RoomService();
