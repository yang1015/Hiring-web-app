import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux'; // 处理中间件;对几个函数进行组合
import thunk from 'redux-thunk';
//import { counter, addGun, removeGun, addGunAsync } from './redux.js';
import './config';

// import {counter} from './redux.js';
// import {authReducer} from './Auth.redux.js';

import reducer from './reducer.js'; // 合并Reducers，这个Reducer指的是combine({xxx这里})的合成物，可以任意起名，取的都是这个
import {Provider} from "react-redux";

import Dashboard from './Dashboard.js';
import Auth from './Auth.js';

const reduxDevtools = window.devToolsExtension;

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
            <Switch>
                <Route path="/login" component={Auth}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
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

