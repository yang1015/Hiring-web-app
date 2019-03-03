import React from 'react';
import {connect} from 'react-redux';
// import io from 'socket.io-client';
import {InputItem, WhiteSpace, List, NavBar, Icon, Grid} from 'antd-mobile';
import {getMsgList, sendNewMsg, socketOnReceiveMsg, markAsRead} from "../../Redux/chat.redux.js";
import {getChatId} from "../../utils.js";
// const socket = io('ws://localhost:9093');

const emojiGrid = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠 👦 👧 👨 👩 👴 👵 👶 👱 👮 👲 👳 👷 👸 💂 🎅 👰 👼 💆 💇 🙍 🙎 🙅 🙆 💁 🙋 🙇 🙌 🙏 👤 👥 🚶 🏃 👯 💃 👫 👬 👭 💏 💑 👪'.split(' ').filter(v => v).map(v => ({text: v}));


/* 由于跨域，需要手动链接 不然直接io()就可以了*/
@connect(
    state => state,
    {getMsgList, sendNewMsg, socketOnReceiveMsg, markAsRead}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '', // 用户输入的内容
            msg: [], // 后端真实存储了的内容（用户已经点击确认发送了的那些内容
            showEmojiGrid: false
        }
    }

    componentDidMount() {
        /* 到达dashboard时 已经在那个组件里请求过msgList和监听socket了
        * 但是有一种情况是
        * 1- 在当前这个页面刷新的话，如果没有重写这两句代码 就会为空，没有发送任何请求
        * 加一个判断，如果当前组件下 msgList为空 就请求 如果有数据 就不管
        * 而且不能判断是否为0，因为存在一种情况是本来也没有对话过
        * 所以要看msgList是否有length这个属性
        * 2- 还有一种情况是，发送一次 会渲染两次 也是因为socket监听+页面state一旦变化重新渲染多次的问题
        * */

        if (!this.props.chat.msgList.length) {
            // console.log("Chat组件 没有msglist length")
            this.props.getMsgList();
            this.props.socketOnReceiveMsg();
        }


        /* 优化antd-mobile grid显示 当切换组件时 显示不稳定 carouselMax不稳定*/
        this.fixCarousel();

        // this.props.readMsg();
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

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        });
    }

    sendMsg() {
        // socket.emit('sendmsg', {inputText: this.state.inputText});
        // this.setState({inputText: ''});
        // 发送后state清空 这里要写成'' 而不能是' '
        // 不然componentDidMount里Socket监控的msg就会变成一个数组[' ', '最新接收到的msg']
        // 本意是为了展开之前的state.msg，并用data.msg去覆盖前面的msg: ''的
        // 最后this.state.msg正确的结果为 ['最新接收到的msg']

        const from = this.props.user._id;
        /* chat在user card的url跳转时候 给的是User Obj 而不是一个单独的id 是为了方便在这个组件里直接提取avatar和userName */
        const to = JSON.parse(this.props.match.params.user)._id;
        const msgContent = this.state.inputText

        this.props.sendNewMsg({from, to, msgContent});

        this.setState({
            inputText: '',
            showEmojiGrid: false
        }); // ui上清空 表示发送成功
    }

    componentWillUnmount() {
        /* 把对方放给我的msg全部标记为已读 但是我发给对方的不做处理 */
        // 这里取值的时候不能直接.x.x params里放的是一整个stringify过的obj 所以得先parse 再取
        const fromId = JSON.parse(this.props.match.params.user)._id;
        this.props.markAsRead(fromId);
    }

    render() {
        const currentUserId = this.props.user._id;
        /* 当前使用者 */

        if (!this.props.match.params.user || this.props.match.params.user === 'undefined') return null;

        const chatWith = JSON.parse(this.props.match.params.user); // 从applicant/company list点进来的带有参数的聊天对象

        /* 过滤是否是所选择的这个chatWith和当前user的聊天记录 */
        /* 不管是a对b说的还是b对a说的，所有的ab之间的聊天chatId都是一致的，这样方便区分，而且不存在前后问题，直接顺序渲染就可以了*/
        const chatId = getChatId(chatWith._id, currentUserId);
        const chatMsgList = this.props.chat.msgList.filter(val => val.chatId === chatId);
        /* 所点击用户和本人之间的对话*/

        return (
            <div className='msglist-outer-div' id="chat-page">
                <div className="leave-space-for-input">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.goBack();
                        }}>
                        和 {chatWith.user} 聊天
                    </NavBar>
                    <List>
                        {
                            chatMsgList.map(item => {
                                return currentUserId === item.from ? (
                                    /* 我的信息 */
                                    /* 不要使用chatId 不是唯一的 而_id是数据库自带的唯一标示 */
                                    <List.Item key={item._id}
                                               className='chat-me'
                                               extra={<img
                                                   src={require(`../../images/avatars/${this.props.user.avatar}.png`)}
                                                   alt=""/>}>
                                        <List.Item.Brief>{item.msgContent}</List.Item.Brief>
                                        <WhiteSpace/>
                                    </List.Item>
                                ) : (
                                    <List.Item key={item._id}
                                               thumb={require(`../../images/avatars/${chatWith.avatar}.png`)}>
                                        <List.Item.Brief>{item.msgContent}</List.Item.Brief>
                                        <WhiteSpace/>
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                </div>
                <div className='stick-footer'>
                    <InputItem
                        placeholder="请输入"
                        extra={
                            <div>
                                <span onClick={() => {
                                    this.fixCarousel();
                                    this.setState({showEmojiGrid: !this.state.showEmojiGrid});

                                }}>😀</span>
                                <span onClick={() => this.sendMsg()}>发送</span>
                            </div>

                        }
                        // onChange={(val) => this.handleChange('msg', val)}
                        onChange={(val) => this.setState({inputText: val})}
                        value={this.state.inputText}
                    >
                    </InputItem>
                    {
                        this.state.showEmojiGrid ?
                            <Grid data={emojiGrid} columnNum={8} isCarousel carouselMaxRow={4} onClick = {(e) => {this.setState({inputText: this.state.inputText + e.text})}}/> : null
                    }


                </div>


            </div>

        )
    }
}

export default Chat;