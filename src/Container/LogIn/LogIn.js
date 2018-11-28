import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../Component/Logo/Logo.js';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

import {connect} from 'react-redux';
import {login} from "../../Redux/user.redux";

@connect(
    state => state.user,
    {login}
)

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }


    login() {
        /* 判断输入是否正确 也放在redux里完成*/
        this.props.login(this.state);
    }

    register() {
        /* 跳转 */
        console.log(this.props.history);
        this.props.history.push('/register');
    }

    render() {

        return (
            <div>
                {this.props.redirectTo? <Redirect to = {this.props.redirectTo} /> : null}
                <Logo/>
                <h2 style={{textAlign: 'center'}}>登录页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg? <p className = "error-msg">{this.props.msg}</p> : <p />}
                        <InputItem
                            onChange={val => this.handleChange('user', val)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={val => this.handleChange('pwd', val)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/> <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;
