import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layoutRedux from './reducers/home'
import LandingRedux from './reducers/landingReducer'
import ShopRedux from './reducers/shopReducer'
import ProductRedux from './reducers/productReducer'
import CartRedux from './reducers/cartReducer'
const createReducer = asyncReducers => combineReducers({
	router: routerReducer,
	home: layoutRedux.reducer,
	landing: LandingRedux.reducer,
	shop: ShopRedux.reducer,
	product: ProductRedux.reducer,
	cart: CartRedux.reducer,
	...asyncReducers
});

export default createReducer;
