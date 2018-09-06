import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import App from './App.js';


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


class Dashboard extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to='/dashboard/'>App</Link>
                        </li>
                        <li>
                            <Link to='/dashboard/second'>二营</Link>
                        </li>
                        <li>
                            <Link to='/dashboard/third'>三营</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route to="/dashboard" component={App}/>
                        <Route to="/dashboard/second" component={Second}/>
                        <Route to="/dashboard/third" component={Third}/>
                    </Switch>

                </div>

            </BrowserRouter>

        )
    }
}

export default Dashboard;

