import axios from 'axios';

const GET_USERLIST_SUCCESS = 'GET_USERLIST_SUCCESS';

const initialState = {
    userList: []
}

export function chatUser(state = initialState, action) {
    switch (action.type) {
        case GET_USERLIST_SUCCESS :
            return {
                ...state,
                userList: action.payload
            }

        default: return state
    }
}

function getListSuccess(data) {
    return {
        type: GET_USERLIST_SUCCESS,
        payload: data
    }
}

export function getUserList(type) {
    return dispatch => {
        axios.get(`/user/list?type=${type}`)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getListSuccess(res.data.data));
                }
            });
    }
}