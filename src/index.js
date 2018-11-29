import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux'; // 处理中间件;对几个函数进行组合
import thunk from 'redux-thunk';
//import { counter, addGun, removeGun, addGunAsync } from './redux.js';
import './config.js';
import Login from './Container/LogIn/LogIn.js';
import Register from './Container/Register/Register.js';
import AuthRoute from './Component/AuthRoute/AuthRoute.js';
import BossInfo from './Container/BossInfo/BossInfo.js';
import ApplicantInfo from './Container/ApplicantInfo/ApplicantInfo.js';
import Dashboard from './Component/Dashboard/Dashboard.js';

import './style.css';
// import {counter} from './redux.js';
// import {authReducer} from './Auth.redux.js';

import reducer from './reducer.js'; // 合并Reducers，这个Reducer指的是combine({xxx这里})的合成物，可以任意起名，取的都是这个
import {Provider} from "react-redux";


const reduxDevtools = window.devToolsExtension;

/* steps to use redux in react programs */
/* 1 新建Store */
// 1.1   const store = createStore(counter);
// 1.1.1 const store = createStore(counter, applyMiddleware(thunk));
// 1.2
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    reduxDevtools ? reduxDevtools() : f => f
));
;



ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/applicantinfo' component={ApplicantInfo}/>
                    <Route component={Dashboard}/>{/*任何不匹配的路由地址都会跳转到这个没有path的路由，可以用为404页面*/}
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);


/*

* 原本的写法：
* 1- function render()来包裹 ReactDom.render(<App />, document.getElementById('root'));
* 而且需要将内部子组件所需要的数据通过参数传给它们
* <App
*  store={store}
   addGun={addGun}
   removeGun={removeGun}
   addGunAsync={addGunAsync}
   />
* 2- render(); 调用渲染
* 3- store.subscribe(render); 订阅store的状态 state每次更新后再次调用render()
*
* 有了react-redux这个插件后 提供了Provider这个接口
* 就可以省掉subscribe的订阅
*
* */


//
//

//
//
//
// // 派发事件 dispatch 传递action
//
// function listener(){
//     const current = store.getState();
//     console.log(`现在有机关枪${current}支`);
// }
//
// store.subscribe(listener);
//
// store.dispatch(({type: 'MINUS_GUN'})); // 每一次触发都会触发订阅
// store.dispatch(({type: 'MINUS_GUN'}));
// store.dispatch(({type: 'ADD_GUN'}));

