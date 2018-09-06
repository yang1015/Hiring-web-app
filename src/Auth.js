import React from 'react';
import {connect} from 'react-redux';
import {login, logout } from './Auth.redux.js';

const mapStateToProps = stateObj => { return stateObj}
const actionCreators = {login, logout};
/* 两个reducer */
@connect(mapStateToProps, actionCreators)

class Auth extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props);
        return (
            <div>登录校验页面</div>
        )
    }
}

export default Auth;