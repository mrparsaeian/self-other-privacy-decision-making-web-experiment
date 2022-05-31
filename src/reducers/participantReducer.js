import _ from "lodash";
import { FETCH_PARTICIPANT, EDIT_PARTICIPANT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARTICIPANT:
      return { ...state, ...action.payload };
    case EDIT_PARTICIPANT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
