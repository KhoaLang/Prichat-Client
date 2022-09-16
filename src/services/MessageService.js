import { baseService } from "./BaseService";

export class MessageService extends baseService {
  newMessage = (data) => {
    return this.post(`/api/messages/newMessage`, data);
  };
  getAllMessagesByRoomId = (id) => {
    return this.get(`/api/messages/${id}`);
  };
  getLastestMessage = (id) => {
    // console.log(`/api/messages/lastestMessage/${id}`);
    return this.get(`/api/messages/lastestMessage/${id}`);
  };
  deleteMessage = (id) => {
    return this.delete(`/api/messages/${id}`);
  };
}

export const messageService = new MessageService();
