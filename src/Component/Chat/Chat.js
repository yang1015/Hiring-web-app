import React from 'react';
import {connect} from 'react-redux';
// import io from 'socket.io-client';
import {InputItem, WhiteSpace, List} from 'antd-mobile';
import {getMsgList, sendNewMsg, socketOnReceiveMsg} from "../../Redux/chat.redux.js";

// const socket = io('ws://localhost:9093');

/* 由于跨域，需要手动链接 不然直接io()就可以了*/
@connect(
    state => state,
    {getMsgList, sendNewMsg, socketOnReceiveMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '', // 用户输入的内容
            msg: [] // 后端真实存储了的内容（用户已经点击确认发送了的那些内容
        }
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.socketOnReceiveMsg();
        /* 最开始msg这个数组是一个空数组
        *  在DidMount中开始了socket.on('receivemsg')的事件监听
        *  于是，每当后端重新传回给前端一个新的用户输入之后(inputText)
        *  msg这个数组都会更新，将最新的消息加入到这个数组中
        *  然后在render中不停重新渲染整个消息列表
        *  */
        /*

        let this_ = this;
        // data是后端传回的最新data
        socket.on('receivemsg', function (data) {
            console.log(`上一次的msg: ${this_.state.msg}`); // "" 因为发送之后手动把msg清空的
            this_.setState({
                msg: [...this_.state.msg, data.inputText] // 用最新的数据覆盖了之前的msg
            });
            console.log(`最新的msg: ${this_.state.msg}`); // state.msg是一个数组 ['最新接收到的从后端全局广播的msg']
        });
        */
    }

    sendMsg() {
        // socket.emit('sendmsg', {inputText: this.state.inputText});
        // this.setState({inputText: ''});
        // 发送后state清空 这里要写成'' 而不能是' '
        // 不然componentDidMount里Socket监控的msg就会变成一个数组[' ', '最新接收到的msg']
        // 本意是为了展开之前的state.msg，并用data.msg去覆盖前面的msg: ''的
        // 最后this.state.msg正确的结果为 ['最新接收到的msg']
        let msgObj = {
            from: this.props.user._id,
            to: this.props.match.params.user,
            msgContent: this.state.inputText
        }
        this.props.sendNewMsg(msgObj);
        this.setState({inputText: ''}); // ui上清空 表示发送成功
    }

    matchUserNameById() {

    }

    render() {
        return (
            <div>
                <List>
                    {
                        this.props.chat.msgList.map((item, index) => {
                            return (
                                <List.Item key={index}>
                                    <p>{item.from}</p>
                                    <p>{item.to}</p>
                                    <p>{item.msgContent}</p>
                                    <WhiteSpace/>
                                </List.Item>
                            )
                        })
                    }
                </List>
                <InputItem
                    className='stick-footer'
                    placeholder="请输入"
                    extra={<span onClick={() => this.sendMsg()}>发送</span>}
                    // onChange={(val) => this.handleChange('msg', val)}
                    onChange={(val) => this.setState({inputText: val})}
                    value={this.state.inputText}
                >
                </InputItem>

            </div>

        )
    }
}

export default Chat;