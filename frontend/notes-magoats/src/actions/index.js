import request from 'superagent';
import * as types from './actionTypes';
import Firebase from 'firebase';

const API_URL = "http://api.giphy.com/v1/gifs/search?q=";
const API_KEY = "&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20";

const config = {
  apiKey: "AIzaSyANxbt3oibnsx_2iklHZZGf610O2h_8Ib8",
  authDomain: "notes-magoats.firebaseapp.com",
  databaseURL: "https://notes-magoats.firebaseio.com",
};

Firebase.initializeApp(config);

export function requestGifs(term = null) {
  // console.log(term);
  // replace with react-thunk. we installed ReduxPromise in part 2, actions in Redux are normally completely synchronous: they dispatch as soon as the action creator is fired. This can be problematic when we need to wait on the result of an external call, since we don't want the reducer to receive a promise! With ReduxPromise, we returned a promise as our payload when the action was dispatched, and then the ReduxPromise middleware works to resolve that promise and pass the result of the API call to the reducer.
  // const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);
  // return {
  //   type: types.REQUEST_GIFS,
  //   payload: data
  // }

  // What reduxThunk does, on the other hand, is force the action creator to hold off on actually dispatching the action object to the reducers until dispatch is called. reduxThunk gives us far more flexibility in the way we actually handle our actions. In essence, it gives us a trigger for our gun.
  // Instead of calling dispatch() with an action object to send to a reducer, we can call dispatch() with another action creator function. When we create or login a user via Firebase, we need to wait on the result of that call to figure out how to proceed. If the promise resolves as a success, we need to make sure our application knows that a user is logged in; if not, we need to pass along the error so the user knows what went wrong.
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: types.REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function openModal(gif) {
  return {
    type: types.OPEN_MODAL,
    gif
  }
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      }
    );
  }
}

export function signInUser(credentials) {
  // return {
  //   type: types.SIGN_IN_USER
  // }
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      }
    );
  }
}

//  bug -  if you log out, then refresh the page, it'll appear that you are signed back in But now, if you refresh the page when you're logged in, you'll see the top bar update to show "My Favorites" and "Sign Out" but still get redirected to /login. Why is this?
// Firebase is storing the logged-in user in localStorage, so if you refresh while you're signed in, you'll stay signed in. To fix this bug, we will want to be sure to call Firebase's signOut() method when we log our user out so that localStorage is properly cleared, then dispatch our SIGN_OUT_USER action:
export function signOutUser() {
  return function (dispatch) {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: types.SIGN_OUT_USER
        })
      }
    );
  }
}

// We're already setting authenticated to true in our AuthReducer, but when we refresh the page, authenticated will be reset to the default of "false" if we don't have a way to verify with Firebase that our user should be logged in.
// Let's add another action to check the authentication state with the data Firebase is storing for us:
export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: types.AUTH_USER
  }
}


export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  }
}
