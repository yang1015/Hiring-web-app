import axios from 'axios';


import {getRedirectionPath} from './../utils.js';

const LOAD_DATA = "LOAD_DATA";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";

const initialState = {
    isLoggedIn: false,
    msg: '',
    user: '',
    // pwd: '',
    type: "",
    redirectTo: '',
    // loginErrorMsg: 'failed'
}


// reducer
export function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '',
                isLoggedIn: true,
                redirectTo: getRedirectionPath(action.payload), // 注册成功后跳转的url地址 是更新后的state而不是原state
                ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state,
                msg: action.msg, //????
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                msg: '',
                isLoggedIn: true,
                redirectTo: getRedirectionPath(action.payload)
            }
        case LOGIN_FAILED:
            return {
                ...state,
                msg: action.msg,
                isLoggedIn: false
            }
        case LOAD_DATA:
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                redirectTo: getRedirectionPath(action.payload),
                ...action.payload
            }
        case LOG_OUT_SUCCESS:
            // console.log(action.payload);
            return {
                ...initialState, // 清空state
                ...action.payload,
                redirectTo: '/login'
            }
        default :
            return state;
    }

}

export function loadData(userinfo) {
    return {
        type: LOAD_DATA,
        payload: userinfo
    }
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

function errorMsg(msg) {
    return {
        msg,
        type: ERROR_MSG
    }
}

function loginSuccess(data) {
    // console.log('log in success');
    // console.log(data);
    return {
        type: LOGIN_SUCCESS,
        payload: data //返回该用户的type等数据
    }
}

// function loginError(msg) {
//     return {
//         type: LOGIN_FAILED,
//         msg
//     }
// }


export function register({user, pwd, pwd2, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码不得为空');
    }
    if (pwd !== pwd2) {
        return errorMsg('密码输入不同');
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                // console.log(res);
                // 这里的status是接口自带的属性，不是在user.js那边自己定义的
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名和密码不得为空');
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data)); // user那边包了一层+code才是一个完整对象
                } else {
                    dispatch(errorMsg("登录失败"))
                }
            })
    }
}

function updateSuccess(data) {
    return {
        type: UPDATE_SUCCESS,
        payload: data
    }
}

export function update(data) {
    // 取出该用户的所有信息，再把Avatar放进去，更新
    // server side需要该用户的_id去数据库里取出该用户的所有信息 cookie里取？
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(updateSuccess(res.data.data))
                } else {
                    dispatch(errorMsg("提交失败"));
                }
            })
    }

}


export function logout(){
    return {
        type: LOG_OUT_SUCCESS,
        payload: initialState
    }
}