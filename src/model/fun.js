/*
*
* Description: 一些公共方法处理
* @author  k.liu
  MessageBox.alert(msg).then(function() {
      success && success()
      //成功回调，可不传
  });
  MessageBox.confirm(msg).then(function() {
    success && success()
    //成功回调，比传
  },function(){
    error && error()
    //失败回调。可不传，但是这个function必须写，不然promise 的reject会报错
  });
*/
import MessageBox from './vue-msgbox.js';
require('./vue-msgbox.css');
export default class Fun {
  constructor() {

  }
  qAlert(msg){
    alert(msg)
  }
  showAlert(msg,success,okName){
    MessageBox.alert(msg,'','',okName).then(function() {
        success && success()
    });
  }
  //公共提示信息
  qConfirm(msg){
    return confirm(msg)
  }
  showConfirm(msg,success,error,okName,cancelName){
    MessageBox.confirm(msg,'','',okName,cancelName).then(function() {
      success && success()
    },function(){
      error && error()
    });
  }
//统一关闭
  hideMessage(){
    MessageBox.close();
  }
  //校验表单
  verifyForm(field,msg,start,okName){
    let self = this;
    start = start ? '':'请输入';
    //传入需要检验的字段和提示信息
    for(var i =0;i<field.length;i++){
        if(!field[i]){
            self.showAlert(start+msg[i],'',okName);
            return false
        }
    }
    return true
  }
  //身份证
  IdentityCodeValid(code) {
      var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
      var tip = "";
      var pass= true;

      if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
          tip = "身份证号格式错误";
          pass = false;
      }

     else if(!city[code.substr(0,2)]){
          tip = "地址编码错误";
          pass = false;
      }
      else{
          //18位身份证需要验证最后一位校验位
          if(code.length == 18){
              code = code.split('');
              //∑(ai×Wi)(mod 11)
              //加权因子
              var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
              //校验位
              var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
              var sum = 0;
              var ai = 0;
              var wi = 0;
              for (var i = 0; i < 17; i++)
              {
                  ai = code[i];
                  wi = factor[i];
                  sum += ai * wi;
              }
              var last = parity[sum % 11];
              if(parity[sum % 11] != code[17]){
                  tip = "校验位错误";
                  pass =false;
              }
          }
      }
      if(!pass) alert(tip);
      return pass;
  }
  getTimeTransform(time,type){
    //时间格式的处理
    let self = this,
        result = '';
    switch (type) {
        case 1:
          result =  time.split('T')[0];//年月日
          break;
        case 2:
          result =  time.split('.')[0].replace(/T/g," ");//时分秒
          break;
        case 3:
          result =  self.compareTime(time);
          break;
        default:
          result = time
          break;
    }
    return result
  }
  compareTime(time){
    //计算时间差
    time = time.split('.')[0].replace(/T/g," ").replace(/-/g,"/");
    let tips = '',
        loacalTime = Date.now(),
        serverTime= new Date(time),
        num = loacalTime - serverTime;
    if(num < 0){
      return time
    }else{
      let day  = (num/(1000*60*60*24)) > 1 ? Math.floor(num/(1000*60*60*24)) : 0,
          hour = (num - day*1000*60*60*24)/(1000*60*60) > 1 ? Math.floor((num - day*1000*60*60*24)/(1000*60*60)) : 0,
          minute = (num - day*1000*60*60*24 - hour*1000*60*60)/(1000*60)  > 1 ? Math.floor((num - day*1000*60*60*24 - hour*1000*60*60)/(1000*60))  : 0;
      if(day){
        tips +=day+'天'
      }
      if(hour){
        tips +=hour+'小时'
      }
      tips +=minute+'分钟前'
      return tips
    }
  }
  //不保存历史记录刷新页面，解决自带回退按钮的回退问题
  /*
  1 replace跳转
  2 href刷新
  */
  jumpUrl(replaceUrl,type){
    type = type || 1;
    if(type == 2){
      //微信支付页面比较特殊,ios判断页面方式在spa页面只会记录最开始的页面
      replaceUrl =  '/weixin/index.html?#!/'+replaceUrl
      // location.href =  replaceUrl ;
    }else{
      replaceUrl = '/weixin/index.html#!/'+replaceUrl
    }
    location.replace(replaceUrl);
  }
}
