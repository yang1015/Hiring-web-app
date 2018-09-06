const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export function authReducer(state = {isAuth: false, user: 'skye'}, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case LOGOUT:
            return {...state, isAuth: false}
        default:
            return state;
    }
}

export function login(){
    return {
        type: LOGIN
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}