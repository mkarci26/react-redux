import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import {middleware as reduxPackMiddleware} from 'redux-pack';
import createReducer from '../reducer';

import { routerMiddleware } from 'react-router-redux'
import { createHashHistory } from "history"

const history = createHashHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, reduxPackMiddleware, thunkMiddleware);
  } else {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, reduxPackMiddleware, thunkMiddleware, createLogger({collapsed: true}))
  }
};

const initializeStore = () => {
  const store = createStore(createReducer(), compose(getMiddleware()));

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store;
};

const configureStore = () => {
  const store = initializeStore();
  
  if (module.hot) {
		module.hot.accept('../reducer', () => {
		  const nextRootReducer = require('../reducer').default;
		  store.injectReducer(nextRootReducer(store.asyncReducers));
		});
	}

  return store;
};

export default configureStore
