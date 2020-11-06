import { createStore , combineReducers , applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import Cookies from 'js-cookie';

import authReducer from './reducers/auth_reducer';
import profileReducer from './reducers/profileReducer';

import {RE_AUTH_USER, AUTH_USER} from './actions/actionTypes';

const reducers = combineReducers({authReducer, profileReducer});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//const store = createStoreWithMiddleware(reducers);

const store = createStore(reducers,{},composeEnhancer(applyMiddleware(reduxThunk)));
const token = Cookies.get('token');
if(token){
    store.dispatch({ type:  AUTH_USER});   
}
export default store;