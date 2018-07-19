import request from 'superagent';
import * as types from './actionTypes';

const API_URL = "http://api.giphy.com/v1/gifs/search?q=";
const API_KEY = "&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20";

export function requestGifs(term = null) {
  // console.log(term);
  const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);

  return {
    type: types.REQUEST_GIFS,
    payload: data
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
export function signInUser() {
  return {
    type: types.SIGN_IN_USER
  }
}
export function signOutUser() {
  return {
    type: types.SIGN_OUT_USER
  }
}
