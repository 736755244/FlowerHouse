// pages/search/searchresult.js
Page({
  data: {
    searchstr:'',
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    TypeList: [
      {
        img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCk7qHgBSjMtImhATDuBTj8AkBl.png",
        type: "简约混合",
        spec: "3-4种花材，8-12枝花头",
        price: 366.00,
        order_num: 24,
        order_res: 43
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
      }
    ],
    TypeList1: [
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
      }
    ],
    TypeList2: [
      {
        img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCk7qHgBSjMtImhATDuBTj8AkBl.png",
        type: "简约混合",
        spec: "3-4种花材，8-12枝花头",
        price: 74.00,
        order_num: 45,
        order_res: 79
      },
      {
        img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCk7qHgBSjMtImhATDuBTj8AkBl.png",
        type: "简约混合",
        spec: "3-4种花材，8-12枝花头",
        price: 366.00,
        order_num: 24,
        order_res: 43
      },
      {
        img: "http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACCq7qHgBSiyjPKfAzDuBTj8AkBl.png",
        type: "单品简花",
        spec: "单一花材 1-30枝",
        price: 76.00,
        order_num: 37,
        order_res: 96
      }
    ],
  },
  onLoad(option){
    var that=this;
    that.setData({
      searchstr: option.searchstr
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  //搜索框输入时触发
  inputchange(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //按下键盘上的done或者确认按钮触发
  cmdsearch(e) {
    this.setData({
      searchstr:this.data.searchstr,
      TypeList:this.data.TypeList2,
      currentTab:0
    })
  },
  //清空搜索框
  activity_clear(e) {
    this.setData({
      searchstr: ''
    })
  },
  //预约
  navato(e) {
    wx.navigateTo({
      url: '../booking/detail/detail?id=' + e.currentTarget.id,
    })
  },
  //文章
  toDetail(e) {
    var newid = e.currentTarget.dataset.newid;
    wx.navigateTo({
      url: '../news/newsdetail?id=' + newid,
    })
  },
  //快捷搜索
  cmdSearchForKey(e) {
    var type = e.target.dataset.curtype;
    if (!!type) {
      //跳转本页面，刷新数据
      this.setData({
        searchstr: type,
        TypeList:this.data.TypeList1,
        currentTab:0
      })
    } else {
      return;
    }
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
})
