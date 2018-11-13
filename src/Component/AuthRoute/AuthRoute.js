import React from 'react';
import axios from 'axios';

/*
* 获取用户信息
* 组件跳转
* */
class AuthRoute extends React.Component {
    componentDidMount() {
        console.log(this);
        // 获取用户信息
        /*
         A 当前的登录状态
         1.在别的页面已登录
         2.在别的页面未登录
         B 现在的url地址
         1.login不需跳转
         2.register需要跳转
         C 用户的身份
         D 用户是否完善了信息 头像等
         */
        axios.get('/user/info').then(res => {

        })

    }

    render() {
        return (
            <h2>在这里判断权限跳转</h2>
        )
    }
}

export default AuthRoute;