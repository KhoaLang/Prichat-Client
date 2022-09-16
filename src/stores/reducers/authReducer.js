import {
  GET_AUTH_STATE,
  GET_USER_INFO,
  GET_ACCESS_TOKEN,
} from "../types/AuthenticateTypes";

const initialState = {
  authenticated: false,
  userInfo: null,
  errorMessage: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_STATE:
      return { ...state, authenticated: action.data };
    case GET_USER_INFO:
      return { ...state, userInfo: action.data };
    case "GET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.data };
    default:
      return state;
  }
};
