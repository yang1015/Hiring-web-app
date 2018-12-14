import React from 'react';
import {formatCreateTime} from '../../utils.js';
import {connect} from 'react-redux';
import {getMsgList} from "../../Redux/chat.redux.js";
import {List} from 'antd-mobile';

const Brief = List.Item.Brief;

@connect(
    state => state,
    {getMsgList}
)
class MsgList extends React.Component {
    constructor(props) {
        super(props);
        this.getNewestTalkingName = this.getNewestTalkingName.bind(this);
    }
    getNewestTalkingName(fromId) {
        const userList = this.props.chatUser.userList;

        /* 如果是本人 直接返回user name*/
        if (fromId === this.props.user._id) return this.props.user;

        /* 如果不是本人 遍历user list 找到对应的user name */
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]._id === fromId) return userList[i];
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

        return (
            <div className="msglist">
                <List>
                    {
                        msgValuesList.map((item, index) => {
                            const newestTalkingUser = this.getNewestTalkingName(item[item.length - 1].from);
                            console.log(newestTalkingUser)
                            return (
                                <List.Item
                                    key={index}
                                    thumb = {require(`../../images/avatars/${newestTalkingUser.avatar}.png`)}
                                    extra={(item[item.length - 1].createTime)}>
                                    <Brief> {newestTalkingUser.user}</Brief>
                                    {item[item.length - 1].msgContent}
                                </List.Item>
                            )
                        })
                    }
                </List>

            </div>
        )
    }
}

export default MsgList;