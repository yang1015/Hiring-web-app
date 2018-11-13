import axios from 'axios';

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const initialState = {
    isLoggedIn: false,
    msg: '',
    user: '',
    pwd: '',
    type: ""
}


// reducer
export function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '登录成功',
                isLoggedIn: true,
                ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state,
                msg: action.msg, //????
                isLoggedIn: false
            }
        default :
            return state;
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

export function register({user, pwd, pwd2, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== pwd2) {
        return errorMsg('密码输入不同');
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}