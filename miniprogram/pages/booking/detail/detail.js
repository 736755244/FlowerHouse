const app = getApp();
const db = wx.cloud.database();
var util = require('../../../utils/util.js');
Page({
  data: {
    id:0,
    //轮播图参数
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    Height:"",
    goodinfo:{},
    showinfo:false
  },
  onLoad(option) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var calc = clientHeight- 50;
        that.setData({
          Height: calc
        });
      }
    });
    //
    that.setData({
      id: option.id
    });
    that.getGoodInfo(option.id);
  },
  //获取商品信息
  getGoodInfo(id){
    var that=this;
    wx.cloud.callFunction({
      name:'getGoodInfo',
      data:{
        id:id
      },
      success:function(res){
        that.setData({
          goodinfo: res.result[0],
          showinfo:true
        })
      }
    })
  },
  //预定页面
  toOrder(e){
    wx.navigateTo({
      url: '../toorder/toorder?goodid=' + e.currentTarget.dataset.goodid,
    })
  }
})
