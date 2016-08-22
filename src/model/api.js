import store from "./store.js"
let stores = new store()
import fun from './fun.js'
let baseFun = new fun()
export default class Api {
  constructor() {
    //path可配置
    this.path = '/DuoBao';
  }
  //设置api接口
  setModel(url){
      return this.path + url
  }
  models(){
    let _ret ={};
    //模拟登录
    _ret.simulateUserLogin = this.setModel('/api/Account/SimulateUserLogin');
    //用户信息
    _ret.getUserProfileInfo = this.setModel('/api/User/GetUserProfileInfo');
    //获取用户签名
    _ret.getUserIntroduction = this.setModel('/api/User/GetUserIntroduction');
    //修改用户签名
    _ret.modifyUserIntroduction = this.setModel('/api/User/ModifyUserIntroduction');
    //获取地区信息
    _ret.getUserPlaceInfo =this.setModel('/api/User/GetUserPlaceInfo') ;
    //更新地区信息
    _ret.modifyUserPlace =this.setModel('/api/User/ModifyUserPlace') ;
    //获取二级城市列表
    _ret.getDistrictList = this.setModel('/api/Common/GetDistrictList');
    //获取个人银行卡
    _ret.getUserBankAccountList = this.setModel('/api/User/GetUserBankAccountList');
    //添加银行卡
    _ret.addBankAccount = this.setModel('/api/User/AddBankAccount');
    //获取银行列表
    _ret.getBankList = this.setModel('/api/Common/GetBankList');
    //获取实名认证信息
    _ret.getUserRealNameInfo = this.setModel('/api/User/GetUserRealNameInfo');
    //添加银行账户
    _ret.addBankAccount = this.setModel('/api/User/AddBankAccount');
    //查询银行卡详细
    _ret.getBankAccountDetailedInfo = this.setModel('/api/User/GetBankAccountDetailedInfo');
    //删除银行卡
    _ret.deleteBankAccount = this.setModel('/api/User/DeleteBankAccount');
    //获取收货地址列表
    _ret.getUserAddressList = this.setModel('/api/User/GetUserAddressList');
    //添加收货地址
    _ret.addAddress = this.setModel('/api/User/AddAddress');
    //获取收货地址详情
    _ret.getAddressDetailedInfo = this.setModel('/api/User/GetAddressDetailedInfo');
    //修改收货地址
    _ret.modifyAddress = this.setModel('/api/User/ModifyAddress');
    //删除收货地址
    _ret.deleteAddress = this.setModel('/api/User/DeleteAddress');
    //设置支付密码
    _ret.setPayPassword = this.setModel('/api/User/SetPayPassword');
    //创建提现订单
    _ret.createWalletWithdrawOrder = this.setModel('/api/Payment/CreateWalletWithdrawOrder');
    //充值订单
    _ret.createWalletRechargeOrder = this.setModel('/api/Payment/CreateWalletRechargeOrder');
    //支付渠道
    _ret.getAvailablePayChannelList = this.setModel('/api/Payment/GetAvailablePayChannelList');
    //公司账户银行卡
    _ret.getFinancePublicBankAccountList = this.setModel('/api/Payment/GetChuenHangPublicBankAccountList');
    //创建支付订单。
    _ret.createPayOrder = this.setModel('/api/Payment/CreatePayOrder');
    //创建离线订单
    _ret.createOfflinePayOrder = this.setModel('/api/Payment/CreateOfflinePayOrder');
    //夺宝频道
    _ret.getDuoBaoChannelList = this.setModel('/api/DuoBao/GetDuoBaoChannelList');
    //获取频道的产品列表
    _ret.getOnSaleDuoBaoActivityList = this.setModel('/api/DuoBao/GetOnSaleDuoBaoActivityList');
    //创建夺宝订单
    _ret.createDuoBaoOrder = this.setModel('/api/DuoBao/CreateDuoBaoOrder');
    //夺宝结算剩余
    _ret.getDuoBaoActivityBasicInfo = this.setModel('/api/DuoBao/GetDuoBaoActivityBasicInfo');
    //钱包支付
    _ret.walletPay = this.setModel('/api/Payment/WalletPay');
    //奖品详情
    _ret.getDuoBaoActivityDetailedInfo = this.setModel('/api/DuoBao/GetDuoBaoActivityDetailedInfo');
    //getMerchantPrepayInfo
    _ret.getMerchantPrepayInfo = this.setModel('/api/Payment/GetMerchantPrepayInfo');
    //上传图片到数据库
    _ret.uploadToDB = this.setModel('/api/Image/UploadImageToDB');
    //上传到服务器
    _ret.uploadToDisk = this.setModel('/api/Image/UploadImageToDisk');
    //获取订单密钥
    _ret.getPayOrderPrepayInfo = this.setModel('/api/Payment/GetPayOrderPrepayInfo');
    //计算详细
    _ret.getDuoBaoCalculateInfo = this.setModel('/api/DuoBao/GetDuoBaoCalculateInfo');
    //实名认证信息
    _ret.isUserRealNamePassed = this.setModel('/api/User/IsUserRealNamePassed');
    //充值订单
    _ret.getUserRechargeOrderList = this.setModel('/api/User/GetUserRechargeOrderList');
    //提现列表
    _ret.getUserWithdrawOrderList = this.setModel('/api/User/GetUserWithdrawOrderList');
    //微信登录准备
    _ret.wxGzhLoginPrepare = this.setModel('/api/Account/WxGzhLoginPrepare');
    //微信登录回调
    _ret.wxGzhLogin  = this.setModel('/api/Account/WxGzhLogin');
    //检查手机号是否被注册
    _ret.isMobileRegistered = this.setModel('/api/Account/IsMobileRegistered');
    //发送验证码
    _ret.sendRegisterValidCode = this.setModel('/api/Account/SendRegisterValidCode');
    //注册
    _ret.register =this.setModel('/api/Account/Register');
    //实名认证
    _ret.submitRealNameApply = this.setModel('/api/User/SubmitRealNameApply');
    //修改密码前的验证
    _ret.setPayPasswordPrepare = this.setModel('/api/User/SetPayPasswordPrepare');
    //获取实名认证提交的信息资料
    _ret.getUserRealNameApplyInfo = this.setModel('/api/User/GetUserRealNameApplyInfo');
    //修改银行卡账户
    _ret.modifyBankAccount = this.setModel('/api/User/ModifyBankAccount');
    //钱包余额
    _ret.getUserWalletInfo = this.setModel('/api/User/GetUserWalletInfo');
    //交易记录
    _ret.getUserWalletBillList = this.setModel('/api/User/GetUserWalletBillList');
    //添加心愿单
    _ret.addDuoBaoWish = this.setModel('/api/DuoBao/AddDuoBaoWish');
    //删除心愿单
    _ret.cancelDuoBaoWish = this.setModel('/api/DuoBao/CancelDuoBaoWish');
    //心愿单列表
    _ret.getUserDuoBaoWishList = this.setModel('/api/DuoBao/GetUserDuoBaoWishList');
    //获取夺宝历史中奖列表。
    _ret.getDuoBaoHistoryWinList = this.setModel('/api/DuoBao/GetDuoBaoPrizeWinList');
    //获取用户夺宝中奖列表。
    _ret.getUserDuoBaoWinList = this.setModel('/api/DuoBao/GetUserDuoBaoWinList');
    //app版本号
    _ret.getCurrentVersion =this.setModel('/api/Common/GetCurrentVersion');
    //获取用户参与的奖期列表。
    _ret.getUserDuoBaoActivityList = this.setModel('/api/DuoBao/GetUserDuoBaoActivityList');
    //获取奖期中奖信息。
    _ret.getDuoBaoActivityWinInfo = this.setModel('/api/DuoBao/GetDuoBaoActivityWinInfo');
    //获取奖期所有参与记录。
    _ret.getDuoBaoActivityBuyList = this.setModel('/api/DuoBao/GetDuoBaoActivityBuyList');
    //轻量版地址信息
    _ret.getAddressBasicInfo = this.setModel('/api/User/GetAddressBasicInfo');
    //创建发货单
    _ret.createDuoBaoDeliveryOrder = this.setModel('/api/DuoBao/CreateDuoBaoDeliveryOrder');
    //晒单
    _ret.publishDuoBaoComment = this.setModel('/api/DuoBao/PublishDuoBaoComment');
    //晒单分享列表
    _ret.getDuoBaoPrizeCommentList = this.setModel('/api/DuoBao/GetDuoBaoPrizeCommentList');
    //获取用户奖期夺宝订单列表
    _ret.getUserActivityDuoBaoOrderList = this.setModel('/api/DuoBao/GetUserActivityDuoBaoOrderList');
    //获取夺宝发货单详情。
    _ret.getDuoBaoDeliveryOrderDetailedInfo = this.setModel('/api/DuoBao/GetDuoBaoDeliveryOrderDetailedInfo');
    //获取晒单详情
    _ret.getDuoBaoCommentDetailedInfo = this.setModel('/api/DuoBao/GetDuoBaoCommentDetailedInfo');
    //生成随机设备号。
    _ret.generateDeviceId = this.setModel('/api/Common/GenerateDeviceId');
    //获取其他用户信息
    _ret.getUserViewInfo = this.setModel('/api/User/GetUserViewInfo');
    //获取银行卡明细
    _ret.getUserBankAccountBillList = this.setModel('/api/User/GetUserBankAccountBillList');
    //判断是否登录
    _ret.isUserLogin = this.setModel('/api/Account/IsUserLogin');
    //提现限制
    _ret.getUserWithdrawLimits = this.setModel('/api/Payment/GetUserWithdrawLimits');
    //存款详细
    _ret.getRechargeOrderDetailedInfo = this.setModel('/api/User/GetRechargeOrderDetailedInfo');
    //提现详细
    _ret.getWithdrawOrderDetailedInfo = this.setModel('/api/User/GetWithdrawOrderDetailedInfo');
    //取消存款订单
    _ret.cancelWalletRechargeOrder = this.setModel('/api/Payment/CancelWalletRechargeOrder');
    //取消order支付订单
    _ret.cancelPayOrder = this.setModel('/api/Payment/CancelPayOrder');
    //取消Merchant订单
    _ret.cancelMerchantOrder = this.setModel('/api/Payment/CancelMerchantOrder');
    //获取微信公众号配置信息
    _ret.getWxGzhJsApiConfig = this.setModel('/api/Common/GetWxGzhJsApiConfig');
    //微信支付前准备
    _ret.wxGzhPayPrepare = this.setModel('/api/Payment/WxGzhPayPrepare');
    //微信支付失败取消
    _ret.cancelWxGzhPayOrder = this.setModel('/api/Payment/AutoCancelWxGzhPayOrder');
    return _ret;
  }
  //发送请求
  /*
  * @author  k.liu
  * Description: 通用的api接口调用
  * @param url [必选]		[url信息，从上面的key匹配]
  * @param postData      [必选]		[post参数]
  * @param successCallback        [必选]		[成功回调]
  * @param errorCallback        [可以传空]		[失败的回调]
  * @param nocheck	 [可选]		[是否需要验证登录信息]
  */
  send(url,postData,successCallback,errorCallback,nocheck,notShowLoading,withUserInfo){
    if(!notShowLoading){
      //自定义是否showloading
      $("#qhCommonLoading").show();
    }
    let apiType = typeof postData == "string" ? 'get' : 'post';
    if(!withUserInfo){
        postData  = Object.assign(postData,{"UserInfo":stores.getStore('userinfo')},stores.getStore('deviceInfo'));
    }
    let self= this,
        jdata = JSON.stringify(postData);
    $.ajax({
      url:self.models()[url],
      type:apiType,
      contentType:'application/json',
      data:jdata,
      success:function(data){
        if(!notShowLoading){
          $("#qhCommonLoading").hide();
        }
        if(data.Success){
          if(nocheck){
            //登录接口不需要判断是否需要登录
            // console.warn("登录接口不需要判断是否需要登录");
            successCallback && successCallback(data)
          }else if(data.LoginStatus){
                if(data.LoginStatus.IsLogin && data.LoginStatus.NeedLogin ){
                      // console.warn("需要登录并且已经登录");
                      successCallback && successCallback(data)
                }else{
                      // console.warn("返回IsLogin但是不需要登录");
                      successCallback && successCallback(data)
                }
          }else if(!data.LoginStatus ){
              // console.warn("不返回IsLogin不需要登录");
              successCallback && successCallback(data)
          }
        }else{
              // console.error('错误信息=='+data.Message+'          错误code=='+data.RetCode);
              if(data.hasOwnProperty('LoginStatus')){
                if(!data.LoginStatus){
                  baseFun.showAlert(data.Message,errorCallback);
                  return false;
                }else if(data.LoginStatus && data.LoginStatus['IsLogin']){
                  //如果存在LoginStatus ！= null 且已经登录，一般是其他错误
                    baseFun.showAlert(data.Message,errorCallback);
                    return false;
                }else if(data.LoginStatus && !data.LoginStatus['IsLogin']){
                    //立即去登录
                    stores.setStore('loginBack',location.href);
                    baseFun.jumpUrl('wxPrepare')
                }
              }else{
                baseFun.showAlert(data.Message,errorCallback);
                return false;
              }
        }
      },
      error:function(){
        if(!notShowLoading){
          $("#qhCommonLoading").hide();
        }
        baseFun.showAlert("网络异常");
        return false;
      }
    })
  }
}
