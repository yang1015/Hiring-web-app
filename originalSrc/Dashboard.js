import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './Auth.redux.js';
import App from './App.js';
import {Button} from 'antd-mobile';

/* 无状态组件 */
function Second() {
    return (
        <h1>
            二营
        </h1>
    )
}

function Third() {
    return (
        <h1>
            三营
        </h1>
    )
}

@connect(
    state => state.authReducer, // 明确你需要哪个reducer里的内容
    {logout}
)

class Dashboard extends React.Component {
    render() {
        const matchPrefix = this.props.match;
        const redirection = <Redirect to="/login" />
        const app = <div>
            <Button type="warning" onClick={this.props.logout}>注销</Button>
            <ul>
                <li>
                    <Link to={`${matchPrefix.url}`}>App</Link>
                </li>
                <li>
                    <Link to={`${matchPrefix.url}/second`}>二营</Link>
                </li>
                <li>
                    <Link to={`${matchPrefix.url}/third`}>三营</Link>
                </li>
            </ul>

            <Route path={`${matchPrefix.url}`} exact component={App}/>
            <Route path={`${matchPrefix.url}/second`} component={Second}/>
            <Route path={`${matchPrefix.url}/third`} component={Third}/>

        </div>
        return this.props.isAuth ? app : redirection;
    }
}

export default Dashboard;

