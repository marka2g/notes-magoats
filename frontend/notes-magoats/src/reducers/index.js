import { combineReducers } from 'redux';
import gifsReducer from './gifs';
import modalReducer from './modal';
// add react-router-redux's routerReducer to our main reducers file so that it can intercept navigation actions and keep track of our current location in the store:
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  gifs: gifsReducer,
  modal: modalReducer,
  router: routerReducer
});

export default rootReducer;
