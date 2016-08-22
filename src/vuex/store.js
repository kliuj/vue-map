import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
let togCls = () =>{
    //统一操作一些样式
    if($("#menu")[0].style.display == "none"){
      $("#menu")[0].style.display = 'block';
    }else{
      window.setTimeout(()=>{
        $("#menu")[0].style.display = 'none';
      },400)
    }
    $('html').toggleClass("mm-opened mm-blocking mm-background mm-theme-dark mm-pageshadow mm-opening ");
    $("html,body").toggleClass("scroll-hide");
    $("#mainMenu").removeClass("mm-subopened").addClass("mm-current");
    $(".subMenuBar").removeClass("mm-opened").addClass("mm-notopen");
}
// 创建一个 object 存储应用启动时的状态
const state = {
    // 应用启动时，count 置为0
    isOpenTap: false,
    changeState:true,//列表页添加修改是否刷新，第一次状态为true，要求刷新页面,后续如果是点击返回，则不刷新，如果是修改，删除，添加，则需要刷新列表页。比如地址信息的更新
    userStateTime:''
}
// 创建一个 object 存储 mutation 函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  INCREMENT (state) {
    togCls()
    window.setTimeout(()=>{
      state.isOpenTap = !state.isOpenTap;
    },500)
    //统一初始化列表修改状态
    state.changeState = true;
  },
  //收获地址列表信息修改
  CHANGE(state){
    state.changeState = !state.changeState;
  },
  //用户信息刷新
  USERSTATECHANGE(state){
    state.userStateTime = Date.now();
  }
}
// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
  state,
  mutations
})
