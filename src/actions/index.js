import streamAPI from '../apis/stream';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, EDIT_STREAM, DELETE_STREAM } from "./types";

export const signIn = (userProfile) => ({
  type: SIGN_IN,
  payload: userProfile
});

export const signOut = () => ({
  type: SIGN_OUT
})

export const createStream = (data) => async (dispatch, getState) => {
  const { auth: { profile: userProfile } } = getState();
  const streamResponse = await streamAPI.post('/streams', {...data, ownerId: userProfile.id});
  dispatch({ type: CREATE_STREAM, payload: streamResponse.data});
  
  // Programatically navigating the user to StreamList Component
  history.push('/');
}

export const fetchStreams = () => async (dispatch, getState) => {
  const streamsResponse = await streamAPI.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: streamsResponse.data });
}

export const fetchStream = (streamId) => async (dispatch) => {
  // const streamResponse = await new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(streamAPI.get(`/streams/${streamId}`));
  //   }, 4000)
  // });
  const streamResponse = await streamAPI.get(`/streams/${streamId}`);
  dispatch({ type: FETCH_STREAM, payload:streamResponse.data });
}

export const editStream = (streamId, data) => async (dispatch) => {
  const streamResponse = await streamAPI.patch(`/streams/${streamId}`, data);
  dispatch({ type: EDIT_STREAM, payload: streamResponse.data });
  history.push('/');
}

export const deleteStream = (streamId) => async (dispatch) => {
  await streamAPI.delete(`/streams/${streamId}`);
  dispatch({ type: DELETE_STREAM, payload: streamId });
}