import React, {Component} from 'react';
import { connect } from "react-redux";
import {addGun, removeGun, addGunAsync} from "./redux";

// import {addGun, removeGun} from './redux.js'; // 这样当前组件就和其他组件有强耦合关系了 是不推荐的
import { Button } from 'antd-mobile';

class App extends Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        // const store = this.props.store; Provider是最外层的 每个组件都可以直接拿到store 不再需要通过props来派发
        // const num = store.getState();

        /* 通过this.props来获取在组件最底部规定的那些想要拿到的数据 */
        // this.props里有num addGun removeGun和addGunAsync
        const {num, addGun, removeGun, addGunAsync} = this.props; // 解构赋值

        return (
            <div>
                <h2> 现在有机关枪{num}把</h2>
                <Button type = "primary"
                        // onClick = {() => store.dispatch(addGun())} 不再需要dispatch addGun自带这个功能了
                    onClick = {() => addGun()}
                >申请武器</Button>
               <br />
                <Button type = "primary"
                        // onClick = {() => store.dispatch(removeGun())}
                        onClick = {() => removeGun()}
                >上交武器</Button>
                <br />
                <Button type = "primary"
                        // onClick = {() => store.dispatch(addGunAsync())}
                        onClick = {() => addGunAsync()}
                >拖两天再给</Button>
            </div>
        )
    }
}

/* 将你这个组件内所需要的数据 在这里获取一下 */
const mapStateToProps = state => {
    return {
        num: state
    }
}

/* 所需要的action */
const actionCreators = { addGunAsync, addGun, removeGun}

/* connect负责从外部获取组件需要的参数 然后你可以直接在this.props里拿到 */
App = connect(mapStateToProps, actionCreators)(App);


export default App;