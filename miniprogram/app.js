//app.js
var plugin = requirePlugin("chatbot");
import WxValidate from "./utils/WxValidate";
App({
  //全局变量
  globalData: {
    iconpath: "https://7a61-zadmin-674aa1-1300199721.tcb.qcloud.la/icon/",
    picspath: "https://7a61-zadmin-674aa1-1300199721.tcb.qcloud.la/pics/",
    storeid:1,
    userinfo:{
      username:'',
      avator:'',
      userid:'',
      islogin:false
    }
  },
  //
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //对话插件init
    plugin.init({
      appid: "6y2fEwrLoEq1Lg1b7JGatUel4iRX2w", //小程序示例账户，仅供学习和参考
      openid: "", //小程序用户openid，非必填
      success: () => {},
      fail: error => {},
      textToSpeech: false //默认为ture打开状态（自动播放语音）
    });
  }
})
