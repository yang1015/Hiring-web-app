
// {
//     var name = 66;
// }
//
// console.log(name); 可以打印

// name = "SKYE";
// course = "information systems";
//
// console.log(`hello
//         ${name},
//         course: ${course}`);

// const printOut = name => {
//     console.log(name);
// }

// printOut("skye");

//const print = name => name;  // 只有一个return语句 就可以不写大括号
//let returnName = print('tony'); // 返回tony
// console.log(returnName); // 打印tony


/* 箭头函数 */
// setTimeout(
//     () => {
//         console.log(this); // 指代当前文件
//         console.log(`${name} 1`);
//     },
//     1000
// );
//
// setTimeout(
//     function () {
//         console.log(this); // 指代当前函数本身
//         console.log(`${name} 2`);
//     },
//     2000
// )

/* 默认参数 */
// const hello = (name = "skye") => {
//     console.log(name);
// }
//
// hello();
// hello('not skye');

/* 展开符 */

/* 展开数组 */
// const hello = (name1, name2) => {
//     console.log(name1, name2);
// }
//
// nameArr = ["tony", "amy"];
// hello.apply(null, nameArr);
// hello(...nameArr); // 和上面一样效果

/* 将obj处理为数组 */
// let obj = {
//     name: "skye",
//     course: "it systems"
// }

// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));

/* 对象的计算属性 */

// let name = "skye";
// const obj = {}
// obj.name = "hello skye"; // 此时obj为: { name: 'hello skye' }
// obj[name] = "hello skye"; // 此时obj为: { skye: "hello skye" }
// // 动态的将name的值赋为obj的一个属性名
//
//
// const obj2 = {
//     [name]: "hello skye2"
// }// 此时obj2 : { skye: "hello skye2"}

import { Module } from "./module.js";

class myApp {
    constructor() {
        this.name = "skye"
        //var m = new Module();
        Module.sayModule();
        //console.log("module name: " + m.name);
    }
    sayHi(){
        //console.log(`hello ${this.name}`);
    }
}

const a = new myApp();
a.sayHi();






