// pages/booking/toorder/toorder.js
Page({
  data:{
    Height:""
  },
  onLoad(){
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var calc = clientHeight - 50;
        that.setData({
          Height: calc
        });
      }
    });
  },
  confirmOrder(){
    wx.redirectTo({
      url: '../complete/complete',
    })
  }
})
