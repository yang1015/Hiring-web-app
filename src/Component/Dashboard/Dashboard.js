import React from 'react';
import {NavBar} from 'antd-mobile';
import NavFooter from '../NavFooter/NavFooter.js';

import ApplicantList from '../ApplicantList/ApplicantList.js';
import CompanyList from '../CompanyList/CompanyList.js';
import UserCenter from '../UserCenter/UserCenter.js';

import {connect} from 'react-redux';
import {getMsgList, sendNewMsg, socketOnReceiveMsg} from "../../Redux/chat.redux.js";
import {Route, Switch} from 'react-router-dom';


function MsgPage() {
    return <h1>消息页面</h1>
}

@connect(
    state => state.user,
    {getMsgList, socketOnReceiveMsg}
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
        this.props.getMsgList();
        this.props.socketOnReceiveMsg();
    }

    filterOutUnshownData(el, index, array) {
        return el.show;
    }

    render() {

        const {pathname} = this.props.location;
        const navBarList = [
            {
                url: '/applicantlist',
                text: '牛人列表',
                icon: 'boss',
                show: this.props.type === 'boss',
                component: ApplicantList
            },
            {
                url: '/companylist',
                text: '公司列表',
                icon: 'job',
                show: this.props.type === 'applicant',
                component: CompanyList
            },
            {
                url: '/msg',
                text: '消息列表',
                icon: 'msg',
                show: true,
                component: MsgPage

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
                        navBarList.map(item => {
                            if (pathname === item.url && item.show) {
                                return item.text;
                            } else {
                                return null;
                            }
                        })
                    }
                </NavBar>


                <div style={{marginTop: '45px'}}>
                    <Switch>
                        {navBarListToShow.map(item => {
                            return <Route key={item.url} path={item.url} component={item.component}/>
                        })}
                    </Switch>
                </div>


                {/*footer*/}
                <NavFooter data={navBarListToShow}></NavFooter>
            </div>
        )
    }


}

export default Dashboard;