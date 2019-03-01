import React from 'react';
import {NavBar} from 'antd-mobile';
import NavFooter from '../NavFooter/NavFooter.js';

import ApplicantList from '../ApplicantList/ApplicantList.js';
import CompanyList from '../CompanyList/CompanyList.js';
import UserCenter from '../UserCenter/UserCenter.js';
import MsgList from '../MsgList/MsgList.js';

import {connect} from 'react-redux';
import {getMsgList, socketOnReceiveMsg} from "../../Redux/chat.redux.js";
import {getUserList} from '../../Redux/chatUser.redux.js';

import {Route, Switch} from 'react-router-dom';


@connect(
    state => state, //这种写法是没有生命具体针对的是哪个reducer 所以在之后取数据的时候需要this.props.reducerName才可以
    {getMsgList, socketOnReceiveMsg, getUserList}
)
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.filterOutUnshownData = this.filterOutUnshownData.bind(this);
    }

    componentDidMount() {
        /* 一进入dashboard页面 就要先获取msgList 不能等到chat的时候再获取
        *  并且绑定socket的on(receiveMsg)事件 */

        /* 跟chat的didmount里一个道理 是为了限制socket receive不能一直刷新 不然发送一次内容 渲染了多次*/
        if (!this.props.chat.msgList.length) {
            console.log("如果当前情况下 msgList还没有获取过")
            this.props.getMsgList();
            this.props.getUserList(); /* 刷新后user list数据也丢失了 redux数据都会回到初始化状态*/
            this.props.socketOnReceiveMsg();
        } else {
            console.log("msgList已经获取过了")
        }
        // // console.log("当前用户身份: ", this.props.user.type);
        // const getListType = this.props.user.type === 'applicant' ? 'boss' : 'applicant';
        // // console.log("要显示的list类型：", getListType)
        // this.props.getUserList(getListType);
        // /* 这里不用加chatUser 会报错*/
    }

    filterOutUnshownData(el, index, array) {
        return el.show;
    }

    render() {
        console.log(`dashboard页面 redirectTo: ${this.props.user.redirectTo},  currentUrl:  $${this.props.history.location.pathname}`)
        const {pathname} = this.props.location;
        const navBarList = [
            {
                url: '/applicantlist',
                text: '牛人列表',
                icon: 'boss',
                show: this.props.user.type === 'boss',
                component: ApplicantList
            },
            {
                url: '/companylist',
                text: '公司列表',
                icon: 'job',
                show: this.props.user.type === 'applicant',
                component: CompanyList
            },
            {
                url: '/msglist',
                text: '消息列表',
                icon: 'msg',
                show: true,
                component: MsgList

            },
            {
                url: '/usercenter',
                text: '个人中心',
                icon: 'user',
                show: true,
                component: UserCenter
            }
        ]
        let navBarListToShow = navBarList.filter(this.filterOutUnshownData);

        return (

            <div>
                {/*header*/}
                <NavBar mode="dark" className="fixd-header">
                    {
                        navBarListToShow.map(item => {
                            return pathname === item.url? item.text : null;
                        })
                    }
                </NavBar>


                {/*中间内容区域与url的匹配*/}
                <div style={{marginTop: '45px', marginBottom: '45px'}}>
                    <Switch>
                        {navBarListToShow.map(item => {
                            return <Route key={item.url} path={item.url} component={item.component}/>
                        })}
                    </Switch>
                </div>


                {/*footer*/}
                <NavFooter navList={navBarListToShow}></NavFooter>
            </div>
        )
    }


}

export default Dashboard;