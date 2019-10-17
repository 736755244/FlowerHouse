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
    bannerlist: [
      'http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACCRu87jBSiwpM_3BzDuBTjoAkBl.jpg',
      'http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACCTu87jBSjwte1IMO4FOOgCQGU.jpg'
    ],
    //
    Height:""
  },
  onLoad(option) {
    this.setData({
      id: option.id
    });
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
  },
  toOrder(){
    wx.navigateTo({
      url: '../toorder/toorder',
    })
  }
})
