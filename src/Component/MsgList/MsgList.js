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
        this.getNewestTalkingName = this.getNewestTalkingName.bind(this);
    }

    componentDidMount() {
        // const getListType = this.props.user.type === 'applicant' ? 'boss' : 'applicant';
        // this.props.getUserList(getListType); /* 这里不用加chatUser 会报错*/
    }

    getNewestTalkingName(fromId) {
        const userList = this.props.chatUser.userList;
        console.log("userList", userList)

        if (!userList) return null;
        /* 如果是本人 直接返回user name*/
        if (fromId === this.props.user._id) {
            return this.props.user;
        }

        /* 如果不是本人 遍历user list 找到对应的user name */
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]._id === fromId) {
                return userList[i];
            }
        }
    }

    render() {
        /* 1- 按照from的人来分类渲染
         * 2- 每组人只显示最新的一条信息 */
        const msgList = this.props.chat.msgList;
        let msgLinkedList = [];
        /* 以chatId作为key map的是相同chatId的msg的数组集合*/
        for (let i = 0; i < msgList.length; i++) {
            let currentMsg = msgList[i];
            let chatId = currentMsg.chatId;
            if (msgLinkedList[chatId]) msgLinkedList[chatId].push(currentMsg);
            else {
                msgLinkedList[chatId] = [];
                msgLinkedList[chatId].push(currentMsg);
            }
            // 如果当前的msg的from不是我，就新建一个key
        }
        const msgValuesList = Object.values(msgLinkedList); // 把上面linkedlist的每一个key所对的values取出来，然后从index = 0开始排布
        // 将对话数组排序，按照每一个对话组的最后一条信息的时间来判断该组在第几个index上

        const sortedList = msgValuesList.sort((a,b)=> {
            /* b - a是从大到小， a - b是从小到大 */
            const a_newestMsg = a[a.length - 1].createTime;
            const b_newestMsg = b[b.length - 1].createTime;
            console.log(a, b)
            return b_newestMsg - a_newestMsg;
        })
        if (!sortedList) return null;
        else {
            return (
                <div className="msglist">
                    {
                        sortedList.map((item, index) => {
                            const newestTalkingUser = this.getNewestTalkingName(item[item.length - 1].from);
                            if (!newestTalkingUser) return null; // userlist有可能不能及时刷新到数据 所以下面avatar等的属性可能报错
                            const unread = item.filter(val => !val.read && val.to === this.props.user._id).length;
                            return (
                                <List key={index}>
                                    <List.Item
                                        thumb={require(`../../images/avatars/${newestTalkingUser.avatar}.png`)}
                                        extra={<Badge text = {unread} />}>
                                        <Brief> {newestTalkingUser.user}</Brief>
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
}

export default MsgList;