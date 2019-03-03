import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const GET_MSGLIST_SUCCEED = "GET_MSGLIST_SUCCEED"; // 获取聊天列表 全部
const RECEIVE_MSG = "RECEIVE_MSG"; // 读取信息 接收到了新的信息 需要update 加到msg list里
// const MSG_READ = "MSG_READ"; // 该条信息已读 mark
// const UPDATE_MSGLIST_SUCCEED = "UPDATE_MSGLIST_SUCCEED";
const MARK_AS_READ = "MARK_AS_READ";


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
            const unreadN = action.payload.to === action.payload.currentUserId ? 1 : 0;
            /* 监听得到了新的msg之后 在这里更新msgList*/
            return {
                ...state,
                msgList: [...state.msgList, action.payload],
                unread: state.unread + unreadN// .state.msgList取出，然后添加payload(最新一条信息)
            }
        case MARK_AS_READ:
            return {
                ...state,
                mgsList: state.msgList.map(msg => {
                    /* 如果当前msg的from === 我想要标记已读的这条信息的from 那么就read = true */
                    if (msg.from === action.payload.fromId) msg.read = true;
                    return msg;
                }),
                unread: state.unread - action.payload.msgModifiedNum
            }
        default:
            return state;
    }
}

function getMsgListSucceed(msgListAndUserId) {
    // console.log("redux getMsgListSUcceed:  ", msgListAndUserId);
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

export function sendNewMsg({from, to, msgContent}) {
    /* get当前的list 并且往里push一个新的 ❎ 这些都又后端来完成 前端负担不要这么重 */
    return dispatch => {
        // const list = initialState.msgList;
        const createTime =  new Date().getTime()
        // console.log("redux send new msg")
        // console.log(msgObj);
        // list.push(newMsg);
        socket.emit('sendmsg', {from, to, msgContent, createTime});

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
        console.log("socket监听是否receive到新的数据")
        socket.on('receivemsg', function (doc) {
            /* 监听中获得data */
            const data = doc;
            data.currentUserId = getState().user._id;
            dispatch(receiveMsg(data));
        });
    }
}

function markReadSucceed({fromId, currentUserId, msgModifiedNum}) {
    return {
        type: MARK_AS_READ,
        payload: {fromId, currentUserId, msgModifiedNum}
    }
}

export function markAsRead(fromId) {
    /* toId是自己id的算是已读，但是to是对方的不算 */
    return (dispatch, getState) => {
        // 看当前这个fromId发给我的有多少条，然后把这个数字从msgList里的unread里减掉更新 修改成为已读状态
        axios.post('/user/readmsg', {fromId})
            .then(res => {
                const currentUserId = getState().user._id;
                if (res.status === 200 && res.data.code === 0) {
                    const msgModifiedNum = res.data.msgModifiedNum;
                    dispatch(markReadSucceed({fromId, currentUserId, msgModifiedNum}));
                }
            });

    }
}

