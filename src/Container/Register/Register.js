import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../Component/Logo/Logo.js';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from "../../Redux/user.redux";

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            pwd2: '',
            type: 'boss'
        }

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    handleRegister() {
        // 提交注册数据
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo? <Redirect to = {this.props.redirectTo} /> : null}
                <Logo/>
                <h2 style={{textAlign: 'center'}}>注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg? <p className = "error-msg">{this.props.msg}</p> : <p />}
                        <InputItem
                            onChange={val => this.handleChange('user', val)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={val => this.handleChange('pwd', val)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={val => this.handleChange('pwd2', val)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.state.type === 'applicant'}
                            onChange={val => this.handleChange('type', 'applicant')}>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={val => this.handleChange('type', 'boss')}>老板</RadioItem>
                    </List><WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>


            </div>
        )

    }
}

export default Register;
