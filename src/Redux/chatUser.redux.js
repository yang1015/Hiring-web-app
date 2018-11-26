import axios from 'axios';

const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';

const initialState = {
    userList: []
}

export function chatUser(state = initialState, action) {
    switch (action.type) {
        case GET_LIST_SUCCESS :
            return {
                ...state,
                userList: action.payload
            }

        default: return state
    }
}

function getListSuccess(data) {
    return {
        type: GET_LIST_SUCCESS,
        payload: data
    }
}

export function getList(type) {
    return dispatch => {
        axios.get(`/user/list?type=${type}`)
            .then(res => {
                console.log(res.data.data)
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getListSuccess(res.data.data));
                }
            });
    }
}