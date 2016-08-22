<template>
  <header>
      <nav-btn></nav-btn>
      <h1 class="has-icon">首页</h1>
  </header>
  <div class="main">
      <input type="text" name="name" v-model='username' value="" placeholder="用户名" style="height:100px">
      <div class="test" @click="login">
          登录
      </div>
  </div>
</template>
<style media="screen">
  .test{
    height: 50px;
    width: 80%;
    margin:50px auto;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    background-color: #1fbad6;
    color: #fff;
    border-radius: 5px
  }
</style>
<script>
    import navBtn from './navBtn.vue'
    import api from '../model/api.js'
    import store from '../model/store.js'
    let stores = new store();//存储信息
    let models = new api();//发送接口
    import { userInfoState } from '../vuex/actions'
    export default{
      components:{
        navBtn
      },
      data(){
          return {
              qhfrom:'',//来源
              username:''
          }
      },
      vuex: {
        actions: {
          userInfoState:userInfoState //改变侧边栏用户信息
        }
      },
      route:{
        data(transition){
            this.qhfrom = transition.to.query.qhfrom;
        }
      },
      methods:{
        //登录
        login(){
            let postData ={
                "AccountId": this.username,
                "IsThirdPartyAccount": true,
                "ThirdPartyAccountId": this.username,
                "ThirdPartyUserId": this.username,
            },
            result = models.send('simulateUserLogin',postData,(data)=>{
                //存储登录信息
                stores.setStore('userinfo',data.UserInfo);
                this.userInfoState()
                this.$route.router.go({'name':'index'})
            },'',true);
        }
      }
    }
</script>
