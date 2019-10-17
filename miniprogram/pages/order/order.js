Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    newlist:[],
    isEmpty:false,
    orderList:[
      {
        id:20191024,
        status:2,
        stastusname: '进行中',
        title:'小程序服务',
        subtitle:'专业提供小程序服务、设计服务',
        price:'100.00',
        oldprice:'255.00',
        img:'../../images/icon/default.png'
      },
      {
        id: 20191011,
        status: 3,
        stastusname:'已完成',
        title: '小程序服务',
        subtitle: '专业提供小程序服务、设计服务',
        price: '60.50',
        oldprice: '445.00',
        img: '../../images/icon/default.png'
      },
      {
        id: 20190833,
        status: 4,
        stastusname: '已取消',
        title: '小程序服务',
        subtitle: '专业提供小程序服务、设计服务',
        price: '23.50',
        oldprice: '45.00',
        img: '../../images/icon/default.png'
      },
      {
        id: 20190711,
        status: -1,
        stastusname: '待支付',
        title: '小程序服务',
        subtitle: '专业提供小程序服务、设计服务',
        price: '600.50',
        oldprice: '4458.00',
        img: '../../images/icon/default.png'
      },
      {
        id: 20190718,
        status: 5,
        stastusname: '退款中',
        title: '小程序服务',
        subtitle: '专业提供小程序服务、设计服务',
        price: '600.50',
        oldprice: '4458.00',
        img: '../../images/icon/default.png'
      },
    ]
  },
  onLoad(options) {
    var that = this;
    //初始化判断展示那个模块
    this.changelist(options.type);
    //高度自适应
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
  //分发不同list
  changelist(id){
    var that=this;
    that.data.newlist = [];
    var list = [],isemp=false;
    if (id != 0) {
      for (var index in that.data.orderList) {
        var item = that.data.orderList[index];
        if (item.status == id) {
          list.push(item);
        }
      }
    } else {
      list = that.data.orderList;
    }
    isemp=list.length==0?true:false;
    that.setData({
      newlist: list,
      currentTab: id,
      isEmpty: isemp
    })
  },
  //点击按钮操作，应传入订单号-按钮类型=》匹配付款、取消等操作，查询订单内容
  btnOption(e){
    var btntype = e.target.dataset.btntype;
    var orderid = e.target.dataset.orderid;
    wx.navigateTo({
      url: '../order/orderdetail?oid=' + orderid
    })
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
    if (this.data.currentTaB == cur) { 
      return false; 
    }else {
      //切换list的同时，切换list
      this.changelist(cur);
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
  }
  
})
