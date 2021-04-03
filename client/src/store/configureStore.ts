import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { promiseMiddleware } from 'redux-saga-promise-actions';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with saga middleware
  const middlewares = [promiseMiddleware, sagaMiddleware];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
