import axios from 'axios';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const USER_DATA = "USER_DATA";

const initialState = {
    isAuth: false,
    user: 'skye',
    age: 18
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case LOGOUT:
            return {...state, isAuth: false}
        case USER_DATA:
            console.log("axios返回payload: ");
            console.log(action.payload);
            return {
                ...state,
                user: action.payload.user,
                age: action.payload.age
            }
        default:
            return state;
    }
}

// action
export function getUserData() {
    //dispatch用来通知数据修改
    return dispatch => {
        axios.get('/data')
            .then(res => {
                if (res.status == 200) {
                    dispatch(get_user_data(res.data[0]));
                }
            })
    }
}

export function get_user_data(data) {
    return {
        type: USER_DATA,
        payload: data
    }
}

export function login() {
    return {
        type: LOGIN
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

