import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../Redux/user.redux.js';

import browserCookie from 'browser-cookies'
// var cookies = require('browser-cookies');

import {Result, Button, List, WhiteSpace} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state => state.user,
    {logout}
)
class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        console.log("个人中心")
        this.state = {}
        this.logout = this.logout.bind(this)
    }

    logout() {
        /* 清除cookie
        *  跳转login页面
        *  */
        browserCookie.erase('userid');
        this.props.logout();
    }

    render() {
        const userItem = this.props;
        if (!userItem) console.log("useritem不存在");

        return userItem ? (
                userItem.avatar ?
                    <div>
                        <Result img={<img src={require(`../../images/avatars/${userItem.avatar}.png`)} alt=""
                                          style={{width: '50px'}}/>}
                                title={userItem.user}
                                message={userItem.type === 'boss' ? userItem.bossCompany : null}
                        >
                        </Result>

                        <List renderHeader={() => '简介'}>
                            <Item>
                                {userItem.type === 'boss' ? "招聘职位：" : "应聘职位"}
                                {userItem.type === 'boss' ? userItem.jobTitle : userItem.Hunting} <br/>
                                <Brief> {userItem.brief}</Brief>
                                <Brief>{userItem.type === 'boss' ? "薪资范围" : "期望薪资"}：{userItem.type === 'boss' ? userItem.bossSalary : userItem.applicantSalary}</Brief>
                            </Item>
                        </List>
                        <WhiteSpace/>

                        <List renderHeader={() => ' '}>
                            <Button onClick={this.logout}>退出登录</Button>
                        </List>
                    </div>
                    :
                    <Redirect to={userItem.type === 'boss' ? '/bossinfo' : '/applicantinfo'}/>
            )
            :
            <Redirect to={userItem.redirectTo}/>
    }
}

export default UserCenter;
