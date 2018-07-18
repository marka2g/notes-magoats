import {createStore, compose, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // We need to use `compose()` if we're using multiple function transformations to enhance a store—in this case, Redux's applyMiddleware (to which we're passing the imported ReduxPromise) along with our code to enable Redux DevTools. With just those few extra lines of code, any promises we return from our actions should be fully resolved when they hit our reducers.
    compose(
      applyMiddleware(ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
