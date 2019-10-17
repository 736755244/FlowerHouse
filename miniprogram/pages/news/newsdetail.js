// pages/news/newsdetail.js
Page({
  data: {
    winHeight: "",//窗口高度
  },
  onLoad(options){
    var newsid = options.id;//文章编号
    var that = this;
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 150;
        that.setData({
          winHeight: calc
        });
      }
    });
  }
})
