import axios from 'axios';
import {Toast} from 'antd-mobile';

// 所有的请求都会经过拦截器

// 拦截请求
axios.interceptors.request.use(function(config) {
    Toast.loading("加载中");
    return config;
})

// 拦截响应
axios.interceptors.request.use(function(config) {
    Toast.hide(); // 只要返回 立马关闭
    // setTimeout(() => {
    //     Toast.hide();
    // }, 1000)

    return config;
})