import * as types from '../actions/actionTypes';
const initialState = {
  data: []
};

export default function gifs(state = initialState, action){
  switch (action.type) {
    case types.REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data
      };
    default:
      return state;
  }
}
