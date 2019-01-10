import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from "../../Redux/user.redux";

@withRouter // 必须包在最外层
@connect(
    state => state.user,
    {loadData}
)
    /*
    * 获取用户信息
    * 组件跳转
    * */
class AuthRoute extends React.Component {
    componentDidMount() {

        // 获取用户信息
        /*
         A 当前的登录状态
         1.在别的页面已登录
         2.在别的页面未登录

         B 现在的url地址
         1.login不需跳转
         2.register不需要跳转

         C 用户的身份
         D 用户是否完善了信息 头像等
         */

        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        console.log("auth route: ", pathname);
        if (publicList.indexOf(pathname) !== -1) { // 在public list里，那么无需跳转直接null就ok
            // console.log('当前路由处于login 或者 register')
            return;
        }

        /* 如果不在以上两个地址 说明要先判断info是否有 否则还要继续跳转*/


        // 直接localhost:3000的时候 显示的是msg和user center的页面 并没有跳转login页面，但是刷新后会跳转
        // 登录成功后 url是companylist 但是tab没有渲染出来list那个tab 同样也是 自动刷新后又跳转 且有数据


        axios.get('/user/info')
            .then(res => {
               /* console.log('当前路由非login/register');*/
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            // console.log('登录成功');
                            this.props.loadData(res.data.data);
                        } else {
                            console.log("获取信息失败 即将Redirect to /login")
                            this.props.history.push('/login');
                        }
                    } else {
                        console.log("后端报错")
                    }
                }
            )
    }

    render() {
        return null;
    }
}

export default AuthRoute;