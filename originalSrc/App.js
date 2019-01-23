import React from 'react';
import {connect} from "react-redux";
// import * as actions from './redux.js';
import {addGun, removeGun, addGunAsync} from "./App.redux.js";
import {Button} from 'antd-mobile';
/* 在返回props时要注意声明对应的reducer 不然会一直报错说obejct is not a vaild react child*/
const mapStateToProps = state => { return {num: state.counter}} /* 将你这个组件内所需要的数据 给到props */
const actionCreators = { addGunAsync, addGun, removeGun} /* 所需要的action */
@connect(mapStateToProps, actionCreators)

// @connect(
//     state => { return { num: state } }, // 你想要的属性
//     {addGunAsync, addGun, removeGun} // 你想要的方法
// ) // 不可以写分号

class App extends React.Component {
    render() {
        // const store = this.props.store; Provider是最外层的 每个组件都可以直接拿到store 不再需要通过props来派发
        // const num = store.getState();

        /* 通过this.props来获取在组件最底部规定的那些想要拿到的数据 */
        // this.props里有num addGun removeGun和addGunAsync
        //const {num, addGun, removeGun, addGunAsync} = this.props; // 解构赋值

       // console.log(this.props);
        return (
            <div>
                <h1> 现在有机关枪{this.props.num}把</h1>
                <Button type="primary"
                    // onClick = {() => store.dispatch(addGun())} 不再需要dispatch addGun自带这个功能了
                        onClick={this.props.addGun}
                >申请武器</Button>
                <br/>
                <Button type="primary"
                    // onClick = {() => store.dispatch(removeGun())}
                        onClick={this.props.removeGun}
                >上交武器</Button>
                <br/>
                <Button type="primary"
                    // onClick = {() => store.dispatch(addGunAsync())}
                        onClick={this.props.addGunAsync}
                >拖两天再给</Button>
            </div>
        )
    }
}
export default App;

/* 以下方式太丑了
于是增加babel-plugin-transform-decorators-legacy这个装饰器来优化connect
*/

// /* 当前组件内所需要的数据 给到props */
// const mapStateToProps = state => { return {num: state}} // 但是这里的state又是哪里来的哦
// /* 所需要的action */
// const actionCreators = { addGunAsync, addGun, removeGun} // 这里使用的action是在类头里直接引入的action
// /* connect负责从外部获取组件需要的参数 然后你可以直接在this.props里拿到 */
// App = connect(m, actionCreators)(App);

/* 与上面的方法效果一样
const mapStateToProps = state => { return {num: state}}
// 这里使用的action是 定义了 从redux中获取的那些actions 需要引入所有actions: import * as actions from './redux.js';
const mapDispatchToProps = (dispatch) => {
    return {
        addGun: () => dispatch(actions.addGun()),
        removeGun: () => dispatch(actions.removeGun()),
        addGunAsync: () => dispatch(actions.addGunAsync())
    }
}
App = connect(mapStateToProps, mapDispatchToProps)(App);
*/


/*
首先看下函数的签名：
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
connect() 接收四个参数，它们分别是 mapStateToProps ， mapDispatchToProps， mergeProps 和 options
*/




