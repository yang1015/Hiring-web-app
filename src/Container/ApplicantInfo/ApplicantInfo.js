import React from 'react';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../Component/AvatarSelector/AvatarSelector.js';

import { connect } from 'react-redux';
import { update } from '../../Redux/user.redux';

import { NavBar, List, InputItem, TextareaItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';


@connect(
    state => state.user,
    { update }
)
class ApplicantInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.handleAvatarChanged = this.handleAvatarChanged.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleAvatarChanged(el) {
        this.setState({
            avatar: el
        });
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    submit() {
        this.props.update(this.state);
    }

    render() {
        /* 到底需不需要withRouter哦 ！！！*/
        const currentUrl = this.props.history.location.pathname;
        console.log(`applicantInfo页面。redirectTo: ${this.props.redirectTo},  currentUrl: ${this.props.history.location.pathname}`)
        return (
            <div>
                {
                    /* 默认没有redirectTo 但是如果注册成功的话，redirectTo就会被重新赋值，然后成功注册的用户会被导向dashboard+list页面 */
                    this.props.redirectTo && currentUrl !== this.props.redirectTo? <Redirect to = {this.props.redirectTo} /> : null
                }
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={this.handleAvatarChanged}/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={val => this.handleChange('jobHunting', val)}>求职岗位
                        </InputItem>
                        <InputItem
                            onChange={val => this.handleChange('applicantSalary', val)}>期望薪资</InputItem>
                        <TextareaItem
                            title="个人简介"
                            rows="3"
                            onChange={val => this.handleChange('brief', val)}></TextareaItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                </WingBlank>
                <WhiteSpace/><WhiteSpace/>
            </div>
        )
    }
}

export default ApplicantInfo;