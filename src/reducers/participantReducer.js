import {
  CREATE_USER,
  CREATE_USER_GERMANY,
  FETCH_PARTICIPANT,
  EDIT_PARTICIPANT,
  EDIT_PARTICIPANT_GERMANY
} from "../actions/types";

const participantReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARTICIPANT:
      return { ...state, ...action.payload };
    case EDIT_PARTICIPANT:
      return { ...state, ...action.payload };
    case CREATE_USER:
      return { ...state, ...action.payload };
    case CREATE_USER_GERMANY:
      return { ...state, ...action.payload };
    case EDIT_PARTICIPANT_GERMANY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default participantReducer;
