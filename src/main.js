'use strict'
//es6语法：
import Vue from "vue";//其实不用写完,会自动查找。可以直接写import Vue from "vue";
//外部引入别的库都可以用这样的方式，比如jquery等。。
//引入我们编写的测试用vue文件。
Vue.config.devtools = true;
import VueRouter from "vue-router";



import routerMap from './routers';
//请求
// import VueResource from 'vue-resource';

Vue.use(VueRouter);
// Vue.use(VueResource);
var VueTouch = require('vue-touch')
Vue.use(VueTouch)
// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
//实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
routerMap(router);
// 路由器需要一个根组件。
var App =Vue.extend(require('./components/app.vue'))
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
