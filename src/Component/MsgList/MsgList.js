import React from 'react';
import {connect} from 'react-redux';
import {getMsgList} from "../../Redux/chat.redux.js";
import {getUserList} from '../../Redux/chatUser.redux.js';
import {List, Badge} from 'antd-mobile';

const Brief = List.Item.Brief;


@connect(
    state => state,
    {getMsgList, getUserList}
)
class MsgList extends React.Component {
    constructor(props) {
        super(props);
        this.getNewestUser = this.getNewestUser.bind(this);
    }

    componentDidMount() {
        // const getListType = this.props.user.type === 'applicant' ? 'boss' : 'applicant';
        // this.props.getUserList(getListType); /* 这里不用加chatUser 会报错*/
    }

    chatWithThisPerson(User) {
        // /* url里会直接显示用户的名字 很不安全 而_id既安全又隐私*/
        this.props.history.push('/chat/' + JSON.stringify(User));
    }

    getTheTalker(item) {
        /* 如果在这一页重新刷新的话 userList会丢失
        * 退出去重新再点到msgList就没问题了 */
        const userList = this.props.chatUser.userList;
        if (!userList) return null;
        let talkerId = this.props.user._id === item[0].from ? item[0].to : item[0].from;

        for (let i = 0; i < userList.length; i++) {
            if (userList[i]._id === talkerId) {
                return userList[i];
            }
        }
    }

    /* 如果fromId是自己，返回user, 如果不是 那么遍历对比id返回对应的UserObj */
    getNewestUser(item) {
        const userList = this.props.chatUser.userList;
        if (!userList) return null;

        const fromId = item[item.length - 1].from;
        /* 如果是本人 直接返回user对象 */
        if (fromId === this.props.user._id) {
            return this.props.user;
        }

        /* 如果不是本人 遍历user list 找到对应的user对象 */
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]._id === fromId) {
                return userList[i];
            }
        }
    }

    render() {
        /* 1- 按照from的人来分类渲染
         * 2- 每组人只显示最新的一条信息
         */
        const msgList = this.props.chat.msgList;
        if (!msgList.length) return null;

        let msgLinkedList = [];
        /* 以chatId作为key map的是相同chatId的msg的数组集合
        *  chatId相同 说明是同样的两个人之间的聊天记录 */
        for (let i = 0; i < msgList.length; i++) {

            let currentMsg = msgList[i];
            let chatId = currentMsg.chatId;

            /* 如果该chatId指向了任何所链接的数组或者val(初始化都会是初始其为数组) 就直接push进去*/
            if (msgLinkedList[chatId]) {
                msgLinkedList[chatId].push(currentMsg);
            } else {
                /* 如果没有所链接的数组 那么新建 并且push进去 */
                msgLinkedList[chatId] = [];
                msgLinkedList[chatId].push(currentMsg);
            }
            // 如果当前的msg的from不是我，就新建一个key
        }

        /* 把上面linkedlist的每一个key所对的values取出来，然后从index = 0开始排布 方便后面直接使用这个数组来取值 */
        const msgValuesList = Object.values(msgLinkedList); // 即为一个元素是数组的数组 [ [arr1], [arr2]. [arr3] ]
        // 将对话数组排序，按照每一个对话组的最后一条信息的时间来判断该组在第几个index上

        /* 每一个chatId下的对话，取其最后一个，因为最新的永远在最后，拿到它的createTime
        *  和其他chatId下最后一条对话的时间比大小，更大的显示为最新 在最上面 */
        const sortedList = msgValuesList.sort((a, b) => {
            /* b - a是从大到小， a - b是从小到大 */
            const a_newestMsg = a[a.length - 1].createTime;
            const b_newestMsg = b[b.length - 1].createTime;
            return b_newestMsg - a_newestMsg;
        })
        if (!sortedList) return null;
        return (
            <div className="msglist">
                {
                    /* 这里的item指的是不同chatId所对应的每一个数组 [arr1] [arr2] */
                    sortedList.map((item, index) => {

                        /* 返回的是最后那条信息的发送方UserObj */
                        const newestUser = this.getNewestUser(item);
                        if (!newestUser) return null; // userlist有可能不能及时刷新到数据 所以下面avatar等的属性可能报错
                        // filter接收的参数是一个函数 就看你怎么定义了 返回的就是你函数里所想返回的东西
                        const thePersonITalkedWith = this.getTheTalker(item); /* 有可能我是最后一个说话的 */
                        const unreadNum = item.filter(val => !val.read && val.to === this.props.user._id).length;
                        return (
                            <List key={index}>
                                <List.Item onClick={() => this.chatWithThisPerson(thePersonITalkedWith)}
                                           thumb={require(`../../images/avatars/${newestUser.avatar}.png`)}
                                           extra={<Badge text={unreadNum}/>}>
                                    <Brief> {newestUser.user}</Brief>
                                    {item[item.length - 1].msgContent}
                                </List.Item>
                            </List>
                        )
                    })
                }

            </div>
        )
    }

}

export default MsgList;