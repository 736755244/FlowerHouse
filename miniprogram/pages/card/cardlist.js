// pages/card/cardlist.js
Page({
  data: {
    Height:'',
    listinfo:[
      {
        id: 1,
        name:'黄店长',
        info:'xx路x店  8年店长',
        src:"http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDtlJ7gBSjGrNP5BTDuBTjuBUBl.png"
      },
      {
        id: 2,
        name: '张店长',
        info: 'xx路x店  8年店长',
        src: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDylJ7gBSiU_69zMO4FOO4FQGU.png"
      },
      {
        id: 3,
        name: '王店长',
        info: 'xx路x店  8年店长',
        src: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDvlJ7gBSiF3OavAzDuBTjuBUBl.png"
      }
    ]
  },
  onLoad(){
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var calc = clientHeight;
        that.setData({
          Height: calc
        });
      }
    });
  },
  toMoreInfo(e){
    wx.navigateTo({
      url: '../card/card?id=' + e.currentTarget.id
    })
  }
})
