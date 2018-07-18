// next step - integrate actions into the reducer. i.e. remove hardcoded
import {REQUEST_GIFS} from '../actions';

// The first thing we're doing is setting up an initial state for our reducer by setting a data property to an empty array. This helps us avoid any issues with our gifs coming back as null or undefined before they are loaded—because, if you'll recall, we are running props.gifs.map() in our GifsList.
const initialState = {
  data: []
};

// as before, our reducer is just a function, but this time it takes two arguments: state and action.
// It is important to note that the state argument on our reducer does not refer to the entire state of our application—just the state that our GifsReducer is responsible for.
// The action argument handles any action dispatched in our application. This is why we write switch statements in our reducers: we can check for any actions that our reducer cares about or, if it doesn't care about any of the dispatched actions, it can just return the state from the default case.
export default function gifs(state = initialState, action){
  switch (action.type) {
    // object spread syntax - creates a new version of the store, copying all ennumerable properties from the previous version, and then updates just the value of the the data key on the new object.
    // Why not just do something like state.data = action.payload.body.data?
    // !!!! its important to never mutating the state directly. Writing ...state, data: action.payload.body.data allows us to save a new copy of the state with only the data property updated, essentially granting us "Save As" functionality.
    // However, this is still an experimental feature that's not natively supported by any browsers yet, so it does require Babel in order to transpile the code down to ES5. As a result, in the wild you'll often see code that looks something like this:
    // ```
    // return Object.assign({}, state, {
    //     data: action.payload.body.data
    // });
    // ```
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data
      };
    default:
      return state;
  }

}
