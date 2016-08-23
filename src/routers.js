'use strict'

import api from './model/api.js'
let baseApi = new api ();
import fun from './model/fun.js'
let baseFun = new fun ();
export default function(router){
		router.map({
				'/index': {
					name:'index',
					auth:true,
					component:function (resolve) {
						//打包分开的文件异步加载
						require(['./components/map/index.vue'], resolve)
					}
				}
		})
		router.map({

		})
		router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
		    '*':"/index"//重定向任意未匹配路径到/index
		});
		//注册路由切换前
		//使底部菜单栏在一级路由切换时一直保持显示
		//在二级页时隐藏
		router.beforeEach(function (transition) {
			transition.next()
		})
		//注册路由切换后
		router.afterEach(function (transition) {

		})
}
