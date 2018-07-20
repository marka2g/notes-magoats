import * as types from '../actions/actionTypes';
import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../actions';

const initialState =  {
  authenticated: false,
  error: null
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case types.SIGN_OUT_USER:
      return {
        ...state, authenticated: false
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
}
