// pages/card/card.js
Page({
  data: {
    Height:'',
    currentTab: 0,
    id:0,//默认当前店长id
    dzlist: [
      {
        id: 1,
        type:'鲜花植物',
        name: '黄店长',
        dec: 'XX区XX路花店   8年老店',
        src: 'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDtlJ7gBSjGrNP5BTDuBTjuBUBl.png'
      },
      {
        id: 2,
        type: '鲜花植物',
        name: '张店长',
        dec: 'XX区XX路花店   8年老店',
        src: 'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDvlJ7gBSiF3OavAzDuBTjuBUBl.png'
      },
      {
        id: 3,
        type: '鲜花植物',
        name: '吴店长',
        dec: 'XX区XX路花店   8年老店',
        src: 'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDylJ7gBSiU_69zMO4FOO4FQGU.png'
      },
    ],
    cur_dz:{}//当前店长信息
  },
  onLoad(options) {
    var that = this;
    //获取当前店长id
    that.setData({
      id: options.id
    });
    for (var i=0;i<that.data.dzlist.length;i++){
      var item = that.data.dzlist[i];
      if (item.id == options.id){
        that.setData({
          cur_dz: item
        })
        break;
      }
    }
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        var calc = clientHeight - 50;
        that.setData({
          Height: calc
        })
      }
    });
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  backhome(){
    wx.switchTab({
      url: '../index/index'
    })
  }
})
