import React from 'react';
import PropTypes from 'prop-types'

class Context extends React.Component {

    static childContextTypes = {
        name: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            name: 'SKYE'
        }
    }

    /* 拿到child的context 并将需要传输的内容直接return给它 */
    getChildContext() {
        return this.state;
    }
    render() {
        return (
            <div>
                <h1>最外层 {this.state.name}</h1>
                <Middle/>
            </div>

        )
    }
}

class Middle extends React.Component {
    render() {
        return (
            <div>
                <h1>中间层</h1>
                <Third/>
            </div>
        )
    }

}

class Third extends React.Component {
    static contextTypes = {
        name: PropTypes.string
    }

    render() {

        return (
            <h1>最里层{this.context.name} </h1>
        )
    }
}


export default Context;