import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import myRoom from "./roomReducer";
import mySessionReducer from "./shapesGameReducer";
import timerReducer from "./timerReducer";
import participantReducer from "./participantReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  activeUsersInMyRoom: myRoom,
  activeUsersInMySession: mySessionReducer,
  myRoom: myRoom,
  currentTimer: timerReducer,
  participant: participantReducer,
  tasksSetupConfig: taskReducer,
});
