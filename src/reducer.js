import { combineReducers } from 'redux'
import { user } from './Redux/user.redux.js';
import { chatUser } from "./Redux/chatUser.redux.js";
import { chat } from './Redux/chat.redux.js'

/* 合并所有reducer 并返回 */
// combineReducer不是个可以修改的名字 外面引用的时候叫reducer就ok
export default combineReducers({user, chatUser, chat});


