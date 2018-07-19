import {createStore, compose, applyMiddleware} from 'redux';
// import ReduxPromise from 'redux-promise';
// thunk handles firing actions in a conditional way.  gives us control over Redux's dispatch() method, which is responsible for sending every fired action to all of our reducers. This allows us to call actions from within action creators in an asynchronous way.
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
// If Firebase.auth.onAuthStateChanged() returns null, it means that the Firebase auth info is no longer valid, so we call signOutUser() to lock the user out of the application until they sign in again. But if we refresh the page, it still looks like our user is logging out! We need to call verifyAuth() almost as soon as our app boots so we can update the state accordingly.
import * as actions from '../actions';

export const history = createHistory();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxThunk, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.dispatch(actions.verifyAuth());
  return store;
}
