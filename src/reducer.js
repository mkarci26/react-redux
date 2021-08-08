import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layoutRedux from './reducers/home'

const createReducer = asyncReducers => combineReducers({
	router: routerReducer,
	home: layoutRedux.reducer,
	...asyncReducers
});

export default createReducer;
