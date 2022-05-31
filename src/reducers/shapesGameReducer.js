import _ from "lodash";
import { FETCH_ACTIVE_USERS_IN_MY_SESSION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_USERS_IN_MY_SESSION:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    default:
      return state;
  }
};
