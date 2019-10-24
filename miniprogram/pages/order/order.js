const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    newlist:[],
    isEmpty:false
  },
  onLoad(options) {
    var that = this;
    //初始化判断展示那个模块
    this.getlist(options.type);
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  //分发不同list
  getlist(id){
    var that=this;
    that.data.newlist = [];
    wx.cloud.callFunction({
      name:'getOrderList',
      data:{
        pcode:'zm002001',//id,
        userid: wx.getStorageSync('userid')//app.globalData.userinfo.userid
      }
    }).then(res=>{
      that.setData({
        newlist: Object.prototype.toString.call(res.result[0]) == "[object Array]" ? res.result[0] : res.result,
        currentTab: id,
        isEmpty: res.result.length==0?true:false
      })
    })
  
  
  },
  //点击按钮操作，应传入订单号-按钮类型=》匹配付款、取消等操作，查询订单内容
  btnOption(e){
    var btntype = e.target.dataset.btntype;
    var orderid = e.target.dataset.orderid;
    wx.navigateTo({
      url: '../order/orderdetail?oid=' + orderid
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { 
      return false; 
    }else {
      //切换list的同时，切换list
      this.changelist(cur);
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  }
  
})
