import React from 'react';
import Logo from '../../Component/Logo/Logo.js';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login() {
        /* 判断输入是否正确 */
    }
    register() {
        /* 跳转 */
        console.log(this.props.history);
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <Logo/>
                <h2 style = {{textAlign: 'center'}}>登录页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/> <WhiteSpace/>
                    <Button type = "primary" onClick = {this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button type = "primary" onClick = {this.register}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Login;
