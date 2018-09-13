const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
    isAuth: false,
    user: 'skye'
}
export function authReducer(state = initialState, action) {
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