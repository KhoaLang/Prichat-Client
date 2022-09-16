const initialState = {
  userList: [],
  avatar: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      return { ...state, userList: action.data };
    case "GET_USER_AVATAR":
      return { ...state, avatar: action.data };
    default:
      return state;
  }
};
