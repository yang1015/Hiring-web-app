import React from 'react';
import {Button} from 'antd-mobile'

class ShouldComponentUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }

    addOne() {
        this.setState({
            num: this.state.num + 1
        });
        console.log("-----执行了this.setState之后 ", this.state.num, "-----");
        /* should返回的是false，即便state里实际的num一直在+1，但是都不会继续往下走然后render出来*/
        // num: this.state.num++ 不会执行
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("nextState是3的备注才更新")
        if (nextState.num % 3 === 0) return true;
        return false;
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("----- componentDidUpdate -----")
    }

    render() {
        /* 如果should返回false 那么这里的render会一直不执行
        * 因为setState 触发了 shouldUpdate，但是shouldUpdate返回了false 那么后面的生命周期
        * => componentWillUpdate => render => componentDidUpdate 就都不会执行了*/
        console.log("render ", this.state.num);
        return <div>
            <h1 style={{'textAlign': 'center'}}>{this.state.num}</h1>
            <Button type="primary" onClick={() => this.addOne()}>加1</Button>
        </div>
    }
}

export default ShouldComponentUpdate;