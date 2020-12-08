import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import registerReducer from './registerReducer'


let reducers = combineReducers({
    auth: authReducer,
    register: registerReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;