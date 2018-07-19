import { combineReducers } from 'redux';
import gifsReducer from './gifs';
import modalReducer from './modal';
// add react-router-redux's routerReducer to our main reducers file so that it can intercept navigation actions and keep track of our current location in the store:
import { routerReducer } from 'react-router-redux';
// formReducer needs to access store too
import { formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  gifs: gifsReducer,
  modal: modalReducer,
  router: routerReducer
});

export default rootReducer;
