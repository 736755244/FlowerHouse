const app = getApp();
const db=wx.cloud.database();
var util = require('../../utils/util.js');

Page({
  data: {
    iconpath: app.globalData.iconpath,
    avator: '',
    username: '',
    showmore:false,
    showloading:true,
    orderlist:[]
  },
  onShow(){//切换tab时，实时刷新数据
    var that=this;
    that.getlist();
  },
  onLoad(){
    var that=this;
    that.setData({
      avator: wx.getStorageSync('avator'),//app.globalData.userinfo.avator,
      username: wx.getStorageSync('username')//app.globalData.userinfo.username
    })
  },
  //
  getlist(){
    var that = this;
    console.log(wx.getStorageSync('userid'));
    wx.cloud.callFunction({
      name:'getOrderSumInfo',
      data:{
        userid:wx.getStorageSync('userid')//app.globalData.userinfo.userid
      },
      complete:function(res){
        that.setData({
          orderlist: res.result,
          showloading:false
        })
      }
    })
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
