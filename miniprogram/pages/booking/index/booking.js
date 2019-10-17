Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    TypeList: [{
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCk7qHgBSjMtImhATDuBTj8AkBl.png",
      type: "简约混合",
      spec: "3-4种花材，8-12枝花头",
      price: 366.00,
      order_num: 24,
      order_res:43
    },
    {
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCq7qHgBSiyjPKfAzDuBTj8AkBl.png",
      type: "单品简花",
      spec: "单一花材 1-30枝",
      price: 76.00,
      order_num: 37,
      order_res: 96
    },
    {
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCn7qHgBSjoo9s_MO4FOPwCQGU.png",
      type: "繁花混合",
      spec: "4-6种花材，12枝以上",
      price: 399.00,
      order_num: 337,
      order_res: 125
    },
    {
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCk7qHgBSjMtImhATDuBTj8AkBl.png",
      type: "简约混合",
      spec: "3-4种花材，8-12枝花头",
      price: 74.00,
      order_num: 45,
      order_res: 79
    },
    {
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCq7qHgBSiyjPKfAzDuBTj8AkBl.png",
      type: "简约混合",
      spec: "3-4种花材，8-12枝花头",
      price: 744.00,
      order_num: 88,
      order_res: 96
    },
    {
      img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCn7qHgBSjoo9s_MO4FOPwCQGU.png",
      type: "简约混合",
      spec: "4-6种花材，12枝以上",
      price: 756.00,
      order_num: 37,
      order_res: 66
    }]
  },
  onLoad() {
    var that = this;
    //  高度自适应
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
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
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
  },
  //跳转详情页
  navato(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  }
})
