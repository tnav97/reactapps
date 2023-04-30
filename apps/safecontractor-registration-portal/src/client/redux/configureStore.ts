import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';

export default function configureStore() {
  let composeEnhancers = compose;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  const rootPersistConfig = {
    key: 'root',
    storage: storageSession,
  };
  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(ReduxThunk, apiMiddleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
