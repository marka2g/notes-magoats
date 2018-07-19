import * as types from '../actions/actionTypes';
const initialState = {
  data: [],
  favorites: []
};

export default function gifs(state = initialState, action){
  switch (action.type) {
    case types.REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data
      };
    case types.FETCH_FAVORITED_GIFS:
      var arr = [];
      for (var item in action.payload) {
        if (action.payload.hasOwnProperty(item)) {
          arr.push(action.payload[item])
        }
      }
      return {
        ...state, favorites: arr
      };
    default:
      return state;
  }
}
