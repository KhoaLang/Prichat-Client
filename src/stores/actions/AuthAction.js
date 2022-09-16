import { authService } from "../../services/AuthService";
import { GET_AUTH_STATE, GET_USER_INFO } from "../types/AuthenticateTypes";
import { notification } from "antd";

export const loginAction = (form) => {
  return async (dispatch) => {
    try {
      const data = await authService.login(form);
      localStorage.setItem(
        `${process.env.REACT_APP_TOKEN}`,
        data.data.accessToken
      );
      notification["success"]({
        message: "Login Notification",
        description: "Login success",
      });
      dispatch({ type: GET_USER_INFO, data: data.data.user });
      dispatch({ type: GET_AUTH_STATE, data: true });
    } catch (err) {
      notification["error"]({
        message: "Login Notification",
        description: "Login failed",
      });
      console.error(err);
    }
  };
};
export const registerAction = (form) => {
  return async (dispatch) => {
    try {
      const data = await authService.register(form);
      // console.log(data.data);
      // dispatch({ type: GET_AUTH_STATE, data: true });
      localStorage.setItem(
        `${process.env.REACT_APP_TOKEN}`,
        data.data.accessToken
      );
      dispatch({ type: GET_USER_INFO, data: data.data.user });
      dispatch({ type: GET_AUTH_STATE, data: true });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const data = await authService.me();
      dispatch({ type: GET_USER_INFO, data: data.data.user });
      dispatch({ type: GET_AUTH_STATE, data: true });
    } catch (err) {
      console.error(err);
    }
  };
};

export const logOutAction = () => {
  return (dispatch) => {
    localStorage.removeItem(`${process.env.REACT_APP_TOKEN}`);
    dispatch({ type: GET_USER_INFO, data: null });
  };
};
