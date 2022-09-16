import { userService } from "../../services/UserService";

export const findUserAction = (keyword) => {
  return async (dispatch) => {
    try {
      const { data } = await userService.findUser(keyword);
      // console.log(data);
      dispatch({ type: "GET_USER_LIST", data: data.payload });
    } catch (err) {
      console.error(err);
    }
  };
};
export const updateAvatarAction = (avatar) => {
  return async (dispatch) => {
    try {
      const { data } = await userService.updateAvatar(avatar);
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAvatarAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await userService.getAvatar();

      return data.payload.avatar;
      // dispatch({ type: "GET_USER_AVATAR", data: data.payload.avatar });
    } catch (err) {
      console.log(err);
    }
  };
};
