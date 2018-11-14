import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
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

        if (publicList.indexOf(pathname) !== -1) { // 在public list里，那么无需跳转直接null就ok
            return null;
        }

        axios.get('/user/info')
            .then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.props.loadData(res.data.data);
                        } else {
                            this.props.history.push('/login');
                        }
                    } else {
                        console.log("后端报错")
                    }
                }
            )
    }

    render() {
        return null
    }
}

export default AuthRoute;