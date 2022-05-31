import _ from "lodash";
import {
  FETCH_MYROOM,
  UPDATE_USERS_IN_MYROOM,
  FETCH_ACTIVE_USERS_IN_MYROOM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MYROOM:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ACTIVE_USERS_IN_MYROOM:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case UPDATE_USERS_IN_MYROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
