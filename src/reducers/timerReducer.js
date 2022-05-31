import { UPDATE_TIMER, TIMEOUT_TIMER_GOLBAL_FUNCTION } from "../actions/types";
const timeOutGlobalFuction = (
  whatToDoWhenSessionIsFinishedCallBackFunctione
) => {
  return whatToDoWhenSessionIsFinishedCallBackFunctione;
};
const INTIAL_STATE = {
  currentTimerTime: 30,
  timeOutGlobalFuction: () => {
    return null;
  },
  sessionIsFinished: false,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TIMER:
      return { ...state, currentTimerTime: action.payload };
    case TIMEOUT_TIMER_GOLBAL_FUNCTION:
      return { ...state, timeOutGlobalFuction: timeOutGlobalFuction };

    default:
      return state;
  }
};
