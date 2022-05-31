import _ from "lodash";
import { GET_TASKSSETUPCONFIG } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TASKSSETUPCONFIG:
      // return { ...state, ..._.mapKeys(action.payload, "id") };
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
