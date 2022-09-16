import { baseService } from "./BaseService";

class UserService extends baseService {
  findUser = (keyword) => {
    return this.post("/api/users/", keyword);
  };
  updateAvatar = (avatar) => {
    return this.post("/api/users/avatar", avatar);
  };
  getAvatar = () => {
    return this.get("/api/users/avatar");
  };
}

export const userService = new UserService();
