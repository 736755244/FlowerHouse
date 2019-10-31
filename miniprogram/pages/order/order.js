const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //选项卡
    scrollLeft: 0, //tab标题的滚动条位置
    newlist:[],//列表数据
    isEmpty:false,//是否为空
    showList:false,//是否展示列表
    curType:""//当前订单类型
  },
  onLoad(options) {
    new app.ToastPannel();
    var that = this;
    that.setData({
      curType: options.type
    })
    //将传入的code转为下标0-4
    that.codeToNum(options.type);
    //查询数据
    that.getlist(options.type);
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
  getlist(id){
    var idlist = [];
    switch(id){
      case 'zm002001':
        idlist=['zm003001'];
        break;
      case 'zm002002':
        idlist = ['zm003002', 'zm003003'];
        break;
      case 'zm002003':
        idlist = ['zm003004'];
        break;
      case 'zm002004':
        idlist = ['zm003005'];
        break;
      case 'all':
      default:
        idlist = ['zm003001', 'zm003002', 'zm003003', 'zm003004', 'zm003005'];
        break;
    }
    var that=this;
    that.data.newlist = [];
    wx.cloud.callFunction({
      name:'getOrderList',
      data:{
        typeid: idlist,
        userid: wx.getStorageSync('userid')
      }
    }).then(res=>{
      that.setData({
        newlist: res.result,
        // currentTab: id,
        isEmpty: res.result.length==0?true:false,
        showList:true
      })
    })
  },
  //订单详情
  toOrderDetail(e){
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../order/orderdetail?oid=' + orderid
    })
  },
  //按钮统一操作
  cmdOption(e){
    this.showTip({
      icon:"success",
      content: "444444444sfdsfdsfsddsgsdgsg44444"
    })
    return;
    var that=this;
    var btntype = e.currentTarget.dataset.btntype;
    var orderinfo = e.currentTarget.dataset.item;
    wx.cloud.callFunction({
      name: 'changeOrderstatus',
      data: {
        type: btntype,
        orderid: orderinfo._id,
        goodid: orderinfo.goodid
      }
    }).then(res => {
      that.getlist(that.data.curType);
      that.showTip(res.result[0].message)
      // wx.showToast({
      //   title: res.result[0].message
      // })
    })
   
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      showList:false
    });
    this.checkCor();//检查选项卡滚动位置
    this.numToCode(e.detail.current);//设置当前订单类型
    this.getlist(this.data.curType);//查询订单
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    var type = e.target.dataset.type;
    if (this.data.currentTab == cur) { 
      return false; 
    }else {
      this.setData({
        currentTab: cur,
        curType: type,
        showList:false
      })
      this.getlist(type);
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
  //匹配index与code的关系
  numToCode(num){
    var that=this;
    let code="";
    switch (num){
      case 1:
        code = "zm002001"
        break;
      case 2:
        code = "zm002002"
        break;
      case 3:
        code = "zm002003"
        break;
      case 4:
        code = "zm002004"
        break;
      case 0:
      default:
        code = "all"
        break;
    }
    that.setData({
      curType:code
    })
  },
  codeToNum(code){
    var that = this;
    var num = 0;
    switch (code) {
      case "zm002001":
        num = 1;
        break;
      case "zm002002":
        num = 2;
        break;
      case "zm002003":
        num = 3;
        break;
      case "zm002004":
        num = 4;
        break;
      default:
        num = 0;
        break;
    }
    that.setData({
      currentTab: num
    })
  }
  
})
