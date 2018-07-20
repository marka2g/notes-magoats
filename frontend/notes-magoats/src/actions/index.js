import request from 'superagent';
import * as types from './actionTypes';
import firebase from 'firebase';

const API_URL = "http://api.giphy.com/v1/gifs/search?q=";
const API_KEY = "&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20";

const config = {
  apiKey: "AIzaSyANxbt3oibnsx_2iklHZZGf610O2h_8Ib8",
  authDomain: "notes-magoats.firebaseapp.com",
  databaseURL: "https://notes-magoats.firebaseio.com",
  projectId: "notes-magoats",
  storageBucket: "notes-magoats.appspot.com",
  messagingSenderId: "1020814126979"
};

firebase.initializeApp(config);

export function requestGifs(term = null) {
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: types.REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function favoriteGif({selectedGif}) {
  firebase.database.enableLogging(true);
  const userUid = firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;
  console.log(userUid, gifId);

  return dispatch => firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userUid = firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;
  console.log(userUid, gifId);

  return dispatch => firebase.database().ref(userUid).remove();
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = firebase.auth().currentUser.uid;

    firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: types.FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
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
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        // console.log(error);
        dispatch(authError(error));
      }
    );
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        // console.log(error);
        dispatch(authError(error));
      }
    );
  }
}

export function signOutUser() {
  return function (dispatch) {
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: types.SIGN_OUT_USER
        })
      }
    );
  }
}

export function verifyAuth() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
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
