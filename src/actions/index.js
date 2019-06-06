import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (userProfile) => ({
  type: SIGN_IN,
  payload: userProfile
});

export const signOut = () => ({
  type: SIGN_OUT
})