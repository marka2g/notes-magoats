import request from 'superagent';

//1. Action Type
export const REQUEST_GIFS = 'REQUEST_GIFS';

const API_URL = "http://api.giphy.com/v1/gifs/search?q=";
const API_KEY = "&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20";


//2. Action Creator
export function requestGifs(term = null) {
  // console.log(term);
  const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);

  // 3. Action Creator
  return {
    type: REQUEST_GIFS,
    // term
    payload: data
  }
}
