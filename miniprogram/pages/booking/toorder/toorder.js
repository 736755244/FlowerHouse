const app = getApp();
const db = wx.cloud.database();
var util = require('../../../utils/util.js');

Page({
  data:{
    displayWarn: 'display:none',
    Height:"",
    //"2cdae5505dae988c01cc71fa43a2471b"
    username:'',
    phone:'',
    remark:'',
    goodid:''
  },
  onLoad(option){
    var that = this;
    that.setData({
      goodid: option.goodid
    });
    //高度自适用
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var calc = clientHeight - 50;
        that.setData({
          Height: calc
        });
      }
    }); 
    //初始化验证规则
    this.initValidate();
  },
  /*表单-验证字段*/
  initValidate() {
    /*(配置规则1)*/
    const rules = {
      username: {
        required: true
      },
      phone: {
        required: true,
        tel: true
      },
      remark: {
        required: false
      },
    }
    const messages = {
      username: {
        required: '请输入姓名'
      },
      phone: {
        required: '请输入手机号码'
      },
      remark: {
        required: '请填写留言'
      },
    };
    this.WxValidate = app.WxValidate(rules, messages)
  },
  inputedit(e){
    let id = e.currentTarget.dataset.id;
    var value = e.detail.value;
    if (id == "0") {
      this.setData({
        username: value
      })
    }
    if (id == "1") {
      this.setData({
        phone: value
      })
    }
    if (id == "2") {
      this.setData({
        remark: value
      })
    }
  },
  //验证约束
  getPageInfo(){
    let params = this.data;
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0];
      this.showWarnInfo(error);
      return false;
    }
    this.confirmOrder();
  },
  //确认订单
  confirmOrder(){
    if (!app.globalData.userinfo.userid){
      wx.showToast({
        title: '未获取到用户信息，请退出重试',
      })
      return;
    }
    var postdata={
      userid: app.globalData.userinfo.userid,
      storeid: app.globalData.storeid,
      username: this.data.username,
      phone: this.data.phone,
      remark: this.data.remark,
      goodid: this.data.goodid,
      ordernum: 1,
      orderdate: util.formatTime(new Date())
    }
    wx.cloud.callFunction({
      name:'addOrder',
      data: postdata,
      success:function(res){
        wx.showToast({
          title: '提交成功！'
        });
        wx.redirectTo({
          url: '../complete/complete?orderid=' + res.result[0],
        });
      }
    })
  },

  /*表单验证->(可自定义验证形式)*/
  showWarnInfo(error) {
    // 当前page是this对象
    let page = this;
    // 延时时间等待
    let delayTime = 1;
    // 延时等待毫秒,现设置为1000
    let delayMillsecond = 2000;
    // 调用显示警告函数
    showWran(page, error, delayTime, delayMillsecond);
  }
})
//定义错误提示的相关信息
function showWran(page, error, delayTime, delayMillsecond) {
  let timesRun = 0;
  let interval = setInterval(function () {
    timesRun += delayTime;
    if (timesRun === delayTime) {
      clearInterval(interval);
    }
    page.setData({
      warnInfo: error.msg,
      displayWarn: 'display:none'
    });
  }, delayMillsecond);
  page.setData({
    warnInfo: error.msg,
    displayWarn: 'display:block'
  });
}