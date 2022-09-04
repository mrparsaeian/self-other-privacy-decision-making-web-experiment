import { AxioConnection, AxioConnectionGermany } from "../apis/api";
import {
  CREATE_USER,
  FETCH_PARTICIPANT,
  EDIT_PARTICIPANT,
  CREATE_USER_GERMANY,
  EDIT_PARTICIPANT_GERMANY
} from "./types";

export const editParticipant =
  (id, questionnaireResults, participantData) => async (dispatch) => {
    console.log(questionnaireResults);
    const response = await AxioConnection.patch(
      `/users/${id}`,
      questionnaireResults
    );

    dispatch({
      type: EDIT_PARTICIPANT,
      payload: { ...response.data, ...participantData },
    });
  };

export const editParticipantGermany =
  (id, questionnaireResults, participantData) => async (dispatch) => {
    console.log(questionnaireResults);
    const response = await AxioConnectionGermany.patch(
      `/users/${id}`,
      questionnaireResults
    );

    dispatch({
      type: EDIT_PARTICIPANT_GERMANY,
      payload: { ...response.data, ...participantData },
    });
  };

export const fetchParticipantPII = (id) => async (dispatch) => {
  const response = await AxioConnection.get(`/users/${id}`)
  dispatch({ type: FETCH_PARTICIPANT, payload: { participantFromAPI: { ...response.data },
     isAPILoaded: true } });
};

export const createUser = (id) => async (dispatch, getState) => {
  // const userId = getState().userId;
  const response = await AxioConnection.post("/users", {
    // id: id,
    id: id,
  });
  dispatch({ type: CREATE_USER, payload: id });
};
export const createUserGermany = (id) => async (dispatch, getState) => {
  // const userId = getState().userId;
  const response = await AxioConnectionGermany.post("/users", {
    // id: id,
    id: id,
  });
  dispatch({ type: CREATE_USER_GERMANY, payload: id });
};

// export const signOut = () => {
//   return {
//     type: SIGN_OUT,
//   };
// };

// export const createStream = (formValues) => async (dispatch, getState) => {
//   const { userId } = getState().auth;
//   const response = await AxioConnection.post("/streams", {
//     ...formValues,
//     userId,
//   });

//   dispatch({ type: CREATE_STREAM, payload: response.data });
//   history.push("/");
// };

// export const editStream = (id, formValues) => async (dispatch) => {
//   const response = await AxioConnection.patch(`/streams/${id}`, formValues);

//   dispatch({ type: EDIT_STREAM, payload: response.data });
//   history.push("/");
// };

// export const deleteStream = (id) => async (dispatch) => {
//   await AxioConnection.delete(`/streams/${id}`);

//   dispatch({ type: DELETE_STREAM, payload: id });
//   history.push("/");
// };
