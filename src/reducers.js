import { counter } from './App.redux.js';
import { authReducer } from './Auth.redux.js';
import { combineReducers } from 'redux';


/* 合并所有reducer 并返回 */
export default combineReducers(   // combineReducer不是个可以修改的名字 外面引用的时候叫reducer就ok
    {counter, authReducer}
);


