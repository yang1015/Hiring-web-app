import axios from 'axios';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const GET_MSG_LIST_SUCCEED = "GET_MSG_LIST_SUCCEED"; // 获取聊天列表 全部
const RECEIVE_MSG = "RECEIVE_MSG"; // 读取信息 接收到了新的信息 需要update 加到msg list里
const MSG_READ = "MSG_READ"; // 该条信息已读 mark
const initialState = {
    chattingMsgList: [],
    unread: 0
}

export function chat (state = initialState, action) {
    switch(action.type) {
        case GET_MSG_LIST_SUCCEED:
            return {
                ...state,
                chattingMsgList: action.payload,
                unread: action.payload.filter(val => !val.read).length // 把read为true的过滤掉 留下unread的，取长度
            }
        // case RECEIVE_MSG:
        // case MSG_READ:

        default: return state;
    }
}

function getMsgListSucceed(msgList) {
    return {
        type: GET_MSG_LIST_SUCCEED,
        payload: msgList
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist') // 这里必须有/user/ 这是挂载在user router下面的接口 少写/user/的时候，接口一直在发出请求 没有得到回应 一直报错
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log("list获取成功");
                    dispatch(getMsgListSucceed(res.data.msgList));
                }
            });
    }
}