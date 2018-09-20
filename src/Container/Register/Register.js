import React from 'react';
import Logo from '../../Component/Logo/Logo.js';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius'
        }
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <h2 style={{textAlign: 'center'}}>注册页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type === 'genius'}>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type === 'boss'}>老板</RadioItem>
                    </List><WhiteSpace/>
                    <Button type = "primary">注册</Button>
                </WingBlank>


            </div>
    )

    }
    }

    export default Register;
