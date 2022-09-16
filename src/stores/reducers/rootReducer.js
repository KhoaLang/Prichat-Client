import { authReducer } from "./authReducer";
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";
import { messageReducer } from "./messageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer,
  roomReducer,
  userReducer,
  messageReducer,
});
export default rootReducer;
