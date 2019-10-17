// pages/custom/cusdetail.js
Page({
  data: {
    Height:'',
    imgList:[
      "http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACD77vrlBSiAy_2nBzDuBTiQA0Bl.jpg",
      "http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACD87vrlBSiI14beBDDuBTiQA0Bl.jpg",
      "http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACD_7vrlBSiZu_TvBjDuBTiQA0Bl.jpg"
    ]
  },
  onLoad(){
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight;
        var calc = clientHeight - 90;
        that.setData({
          Height: calc
        })
      },
    })
  }
})
