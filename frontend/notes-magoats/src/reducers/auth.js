import * as types from '../actions/actionTypes';

const initialState =  {
  authenticated: false
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_USER:
      return {
        ...state, authenticated: true
      };
    case types.SIGN_OUT_USER:
      return {
        ...state, authenticated: false
      };
    default:
      return state;
  }
}
