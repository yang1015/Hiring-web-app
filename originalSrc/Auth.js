import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, logout, getUserData} from './Auth.redux.js';
import {Button} from 'antd-mobile';
import axios from 'axios';

const mapStateToProps = state => { return state.authReducer}
const actionCreators = {login, logout, getUserData};
/* 两个reducer */
@connect(mapStateToProps, actionCreators)

class Auth extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getUserData(); //dispatch获取接口数据
    }
    render(){
        return (
            <div>
                我是{this.props.user},今年{this.props.age}岁
                {
                    this.props.isAuth?
                        <Redirect to = '/dashboard' />
                        :
                        <div>
                            <h1>您没有权限，需要登录才能看</h1>
                            <Button onClick = {this.props.login}>登录</Button>
                            {/*dispatch了一个登录的action*/}
                        </div>

                }
            </div>
        )
    }
}

export default Auth;