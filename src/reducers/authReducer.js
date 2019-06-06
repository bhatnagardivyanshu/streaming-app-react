import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INIT_STATE = {
  isSignedIn: null,
  profile: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        profile: action.payload
      };

    case SIGN_OUT:
      return {
        ...state,
        profile: {},
        isSignedIn: false
      };
      
    default:
      return state;
  }
};
