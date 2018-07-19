import { combineReducers } from 'redux';
import gifsReducer from './gifs';
import modalReducer from './modal';
import authReducer from './auth';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  gifs: gifsReducer,
  modal: modalReducer,
  router: routerReducer
});

export default rootReducer;
