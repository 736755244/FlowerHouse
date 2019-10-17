var util = require('../../utils/util.js');
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    //用户信息（头像、名称等）
    avatar: '',
    username: '',
    //other
    showmore:false,
    count1:0,
    count2:2,
    count3:3,
    count4:4
  },
  onLoad(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isHide:false,
                avatar: res.userInfo.avatarUrl,
                username: res.userInfo.nickName
              })
              //登录
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  // 可以传给后台，再经过解析获取用户的 openid
                  //此处调用云函数获取相关信息
                  wx.cloud.callFunction({
                    name: 'login',
                    complete: res => {
                      //调用登录日志
                      wx.cloud.callFunction({
                        name:'addLoginInfo',
                        data:{
                          logName: that.data.username,
                          logDate: util.formatTime(new Date())
                        },
                        complete:res=>{
                        }
                      })
                    }
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  //点击获取授权，新版不支持打开弹出授权窗口
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        avatar: e.detail.userInfo.avatarUrl,
        username: e.detail.userInfo.nickName
      });
      //调研登录
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          //console.log("用户的code:" + res.code);
          // 可以传给后台，再经过解析获取用户的 openid
          //此处调用云函数获取相关信息
          wx.cloud.callFunction({
            name: 'login',
            complete: res => {
              //调用登录日志
              wx.cloud.callFunction({
                name: 'addLoginInfo',
                data: {
                  logName: that.data.username,
                  logDate: util.formatTime(new Date())
                },
                complete: res => {
                }
              })
            }
          })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  showOrder(e){
    wx.navigateTo({
      url: '../order/order?type=' + e.currentTarget.id,
    })
  },
  viewmore(){
    this.setData({
      showmore:true
    })
  },
  hiddenmore(){
    this.setData({
      showmore: false
    })
  }
})
