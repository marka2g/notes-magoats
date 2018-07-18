import { combineReducers } from 'redux';
import gifsReducer from './gifs';
import modalReducer from './modal';

const rootReducer = combineReducers({
  gifs: gifsReducer,
  modal: modalReducer
});

export default rootReducer;
