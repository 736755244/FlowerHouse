const app = getApp();
const db = wx.cloud.database();//获取数据库
var util = require('../../utils/util.js');

Page({
  data: {
    iconpath: app.globalData.iconpath,
    picspath: app.globalData.picspath,
    storeid: app.globalData.storeid,//店铺id
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    //固定按钮参数
    laytop:true,
    domshow:false,
    //轮播图参数
    bannerlist: [],
    showBanner:false,
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    //店长list
    dzlist:[]
  },
  onLoad: function() {
    var that=this;
    if (!app.globalData.userinfo.islogin) {
      that.getSettingInfo();
    }
    that.getBannerList();
    that.getDzList();
  },
  //获取授权信息
  getSettingInfo(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userinfo.username = res.userInfo.nickName;
              app.globalData.userinfo.avator = res.userInfo.avatarUrl;
              that.setData({
                isHide: false
              });
              //登录
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  // 可以传给后台，再经过解析获取用户的 openid
                  //此处调用云函数获取相关信息
                  wx.cloud.callFunction({
                    name: 'login',
                    data:{
                      logName: app.globalData.userinfo.username,
                      logDate: util.formatTime(new Date())
                    },
                    complete: res => {
                      app.globalData.userinfo.userid=res.result._id;
                      app.globalData.userinfo.islogin=true;
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
    })
  },

  //点击获取授权，新版不支持打开弹出授权窗口
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userinfo.username = e.detail.userInfo.nickName;
      app.globalData.userinfo.avator = e.detail.userInfo.avatarUrl;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      //调研登录
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          // 可以传给后台，再经过解析获取用户的 openid
          //此处调用云函数获取相关信息
          wx.cloud.callFunction({
            name: 'login',
            data:{
              logName: app.globalData.userinfo.username,
              logDate: util.formatTime(new Date())
            },
            complete: res => {
              app.globalData.userinfo.islogin = true;
              app.globalData.userinfo.userid = res.result.userid;
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
  //获取banner列表
  getBannerList(){
    var that=this;
    wx.cloud.callFunction({
      name: 'getBanner',
      data:{
        type:'banner'
      },
      complete: res => {
        that.setData({
          bannerlist: res.result.data,
          showBanner: true
        })
      }
    })
  },
  //获取店长列表
  getDzList(){
    var that = this;
    wx.cloud.callFunction({
      name: 'getDzInfoList',
      data: {
        storeid:1
      },
      complete: res => {
        that.setData({
          dzlist: res.result.data
        })
      }
    })
  },
  //点击搜索框直接跳转搜索页面
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  //手动滚动banner
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  //店长详情
  toDz(e){
    wx.navigateTo({
      url: '../card/card?sid='+ this.data.storeid+'&did='+ e.currentTarget.id
    })
  },
  //店长列表
  showall(){
    wx.navigateTo({
      url: '../card/cardlist?storeid=' + this.data.storeid,
    })
  },
  //显示收缩操作内容
  showmenu(){
    var isshow = this.data.domshow;
    this.setData({
      domshow: !isshow
    })
  },
  //机器人
  toRobot(){
    wx.navigateTo({
      url: '../robot/robot',
    })
  },
  //系统配置
  toConfig() {
    wx.navigateTo({
      url: '../config/config',
    })
  }
})