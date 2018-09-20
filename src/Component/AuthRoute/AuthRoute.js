import React from 'react';
import axios from 'axios';


class AuthRoute extends React.Component {
    componentDidMount() {
        // 获取用户信息
        /*
         是否登录
         现在的url地址 login不需跳转, register需要跳转
         用户的type
         用户是否完善了信息 头像等
         */

        axios.get('/user/info').then(res => {
            console.log(res);
        })

    }

    render() {
        return (
            <h2>在这里判断权限跳转</h2>
        )
    }
}

export default AuthRoute;