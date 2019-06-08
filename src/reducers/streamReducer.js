import _  from 'lodash';

import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    
    case CREATE_STREAM :
    case FETCH_STREAM:
    case EDIT_STREAM:
      return {
        ...state,
        [payload.id]: payload
      };
    
    case DELETE_STREAM:
      return _.omit(state, payload.id);

    case FETCH_STREAMS:
        return payload.reduce((output, val) => { output[val.id] = val; return output}, {});

    default:
      return state;
  }
};
