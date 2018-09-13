// 定义成常量
const ADD_GUN = "申请武器";
const REMOVE_GUN = "上交武器";

// 通过reducer建立
// 通过旧状态和action来生成新的state

/* 2 reducer */
export function counter (state = 10, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return state; // 默认不变是10个
    }
}

// action creator
export function addGun(){
    return {type: ADD_GUN}
}

export function removeGun(){
    return {type: REMOVE_GUN}
}

// 延迟两秒再添加
export function addGunAsync(){

    // thunk插件的作用，这里可以返回函数 返回的是一个2s后再执行XX函数的setTimeout函数
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun())
            }, 2000
        )
    }
}