// pages/order/orderdetail.js
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
  },
  onLoad(options){
    var oid = options.oid;//订单编号
    var that = this;
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR-40;
        that.setData({
          winHeight: calc
        });
      }
    });
  }
})
