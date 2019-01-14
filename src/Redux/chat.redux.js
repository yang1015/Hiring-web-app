import axios from 'axios';

import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

const GET_MSGLIST_SUCCEED = "GET_MSGLIST_SUCCEED"; // 获取聊天列表 全部
const RECEIVE_MSG = "RECEIVE_MSG"; // 读取信息 接收到了新的信息 需要update 加到msg list里
// const MSG_READ = "MSG_READ"; // 该条信息已读 mark
// const UPDATE_MSGLIST_SUCCEED = "UPDATE_MSGLIST_SUCCEED";


const initialState = {
    msgList: [],
    unread: 0 /* 多一层判断条件，所有msglist中，只有to是我的时候 才算未读，from我的话不算做未读数 */
}

export function chat(state = initialState, action) {

    switch (action.type) {

        case GET_MSGLIST_SUCCEED:
            return {
                ...state,
                msgList: action.payload,
                unread: action.payload.filter(val => !val.read && action.payload.currentUserId === val.to).length
                // 把read为true的过滤掉 留下unread的，取长度
            }

        case RECEIVE_MSG:
            const unreadN = action.payload.to === action.payload.currentUserId? 1 : 0;
            /* 监听得到了新的msg之后 在这里更新msgList*/
            return {
                ...state,
                msgList: [...state.msgList, action.payload],
                unread: state.unread + unreadN// .state.msgList取出，然后添加payload(最新一条信息)
            }

        // case MSG_READ:
        // case UPDATE_MSGLIST_SUCCEED:
        //     return {
        //         ...state,
        //         msgList: action.payload,
        //         unread: action.payload.filter(val => !val.read).length
        //     }

        default:
            return state;
    }
}

function getMsgListSucceed(msgListAndUserId) {
    console.log("redux getMsgListSUcceed:  ", msgListAndUserId);
    return {
        type: GET_MSGLIST_SUCCEED,
        payload: msgListAndUserId
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist') // 这里必须有/user/ 这是挂载在user router下面的接口 少写/user/的时候，接口一直在发出请求 没有得到回应 一直报错
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log("///////// REDUX获取msgList 拿State //////", getState())
                    const msgList = res.data.msgList;
                    msgList.currentUserId = getState().user._id;
                    dispatch(getMsgListSucceed(msgList));
                }
            });
    }
}

// function updateMsgListSucceed(msgList) {
//     return {
//         type: UPDATE_MSGLIST_SUCCEED,
//         payload: msgList
//     }
// }

export function sendNewMsg(msgObj) {
    /* get当前的list 并且往里push一个新的 */
    return dispatch => {
        // const list = initialState.msgList;
        const newMsg = {
            from: msgObj.from,
            to: msgObj.to,
            msgContent: msgObj.msgContent,
            createTime: new Date().getTime()
        }
        // console.log("redux send new msg")
        // console.log(msgObj);
        // list.push(newMsg);
        // dispatch(updateMsgListSucceed(list));
        socket.emit('sendmsg', newMsg);

        /* 后端socket交互 Server.js中on监听sendmsg这里就可以获取这一条msgObj*/
    }
}

function receiveMsg(data) {
    return {
        type: RECEIVE_MSG,
        payload: data
    }
}

export function socketOnReceiveMsg() {
    return (dispatch, getState) => {
        console.log("socket outside state: ", getState().user._id)
        socket.on('receivemsg', function (doc) {
            /* 监听中获得data */
            console.log("inside state: ", getState().user._id)
            const data = doc;
            data.currentUserId = getState().user._id;

            dispatch(receiveMsg(data));
        });
    }
}

export function markAsRead(targetId){
    /* toId是自己id的算是已读，但是to是对方的不算 */
    return (dispatch, getState) => {
        const currentUserId = getState().user._id;
        console.log("标记为已读： ", currentUserId)
    }
}