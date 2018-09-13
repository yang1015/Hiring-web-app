import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, logout} from './Auth.redux.js';
import {Button} from 'antd-mobile';

const mapStateToProps = state => { return state.authReducer}
const actionCreators = {login, logout};
/* 两个reducer */
@connect(mapStateToProps, actionCreators)

class Auth extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){

        return (
            <div>
                {
                    this.props.isAuth?
                        <Redirect to = '/dashboard/' />
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