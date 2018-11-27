import React from 'react';
import {Redirect} from 'react-router-dom';

import AvatarSelector from '../../Component/AvatarSelector/AvatarSelector.js';

import {connect} from 'react-redux';
import {update} from "../../Redux/user.redux";

import {List, InputItem, WhiteSpace, Button, WingBlank, NavBar, TextareaItem} from 'antd-mobile';


@connect(
    state => state.user,
    {update}
)

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAvatarChanged = this.handleAvatarChanged.bind(this);
        this.submit = this.submit.bind(this);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    handleAvatarChanged(avatarText) {
        this.setState({
            avatar: avatarText
        })
    }

    submit() {
        this.props.update(this.state);
    }

    render() {
        return (
            <div>
                {
                    this.props.redirectTo? <Redirect to = {this.props.redirectTo} /> : null
                }
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector selectAvatar={this.handleAvatarChanged}/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={val => this.handleChange('jobTitle', val)}>职位名称</InputItem>
                        <InputItem
                            onChange={val => this.handleChange('bossCompany', val)}>公司名称</InputItem>
                        <InputItem
                            onChange={val => this.handleChange('bossSalary', val)}>职位薪资</InputItem>
                        <TextareaItem
                            title="职位要求"
                            rows="3"
                            onChange={val => this.handleChange('jobDesc', val)}></TextareaItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                </WingBlank>
                <WhiteSpace/><WhiteSpace/>

            </div>
        )
    }
}

export default BossInfo;