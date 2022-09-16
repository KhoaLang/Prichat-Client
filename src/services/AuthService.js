import { baseService } from "./BaseService";
export class AuthService extends baseService {
  login = (data) => {
    return this.post("/api/auth/login", data);
  };
  register = (data) => {
    return this.post("/api/auth/register", data);
  };
  me = () => {
    return this.get("/api/auth/me");
  };
}
export const authService = new AuthService();
