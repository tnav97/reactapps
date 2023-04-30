import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';

export default function configureStore(preloadedState?: object) {
  let composeEnhancers = compose;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  return createStore(
    rootReducer,
    preloadedState || {},
    composeEnhancers(applyMiddleware(apiMiddleware))
  );
}
