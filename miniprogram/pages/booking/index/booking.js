const app = getApp();
const db = wx.cloud.database();
var util = require('../../../utils/util.js');
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    navBar:[],//选项卡列表
    goodslist:[],//商品列表
    showList:false
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
    
    that.getNavBar();
  },

  //获取顶部选项卡
  getNavBar(){
    var that=this;
    wx.cloud.callFunction({
      name:'getDropDownListByID',
      data:{
        typeid:'001'
      },
      success:function(res){
        var list=[{Dict_Code:'',Type_Name:'全部'}];
        list = list.concat(res.result.data);
        that.setData({
          navBar:list
        });
        that.getGoodsList('');
      }
    })
  },
  //获取列表内容
  getGoodsList(id){
    var that=this;
    wx.cloud.callFunction({
      name:'getGoodsList',
      data:{
        storeid:app.globalData.storeid,
        type:id
      },
      success:function(res){
        that.setData({
          goodslist:res.result,
          showList:true
        })
      }
    })
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      showList:false
    });
    this.checkCor();
    this.getGoodsList(this.data.navBar[e.detail.current].Dict_Code);
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    var dcode = e.target.dataset.typeid;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur,
        showList:false
      })
      this.getGoodsList(dcode);
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
