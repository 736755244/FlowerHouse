const app=getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');

Page({
  data: {
    searchstr:'',
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    showList:false,//是否展示页面
    goodList:[],//查询结果
    isgoodEmpty:false,//是否商品为空
    artList:[],//文章列表
    isartEmpty:false,//是否文章为空
    defaultList: [],//搜索历史
    issearchEmpty: false//搜索历史是否为空
  },
  onShow(){
    var that = this;
    that.getDefault();
  },
  onLoad(option){
    var that=this;
    that.getResultByKeyword(option.searchstr);
    that.getArticle(app.globalData.storeid);
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
  //查询商品结果
  getResultByKeyword(key) {
    var that=this;
    wx.cloud.callFunction({
      name:'getSearchResult',
     data:{
       keyword: key
     }
    }).then(res => {
      that.setData({
        showList:true,
        goodList:res.result[0],
        isgoodEmpty: (res.result.length == 0 || res.result[0].length == 0) ? true:false
      })
    })
  },
  //查询文章
  getArticle(sid){
    var that=this;
    wx.cloud.callFunction({
      name:'getArtList',
      data:{
        storeid:app.globalData.storeid
      }
    }).then(res=>{
      that.setData({
        artList:res.result[0],
        isartEmpty: (res.result.length == 0 || res.result[0].length == 0) ? true : false
      })
    })
  },
  //查询搜索历史
  getDefault() {
    var that = this;
    wx.cloud.callFunction({
      name: 'getDefaultSearch',
      data: {
        userid: app.globalData.userinfo.userid,
      }
    }).then(res => {
      that.setData({
        defaultList: res.result,
        issearchEmpty: res.result.length == 0 ? true : false
      })
    })
  },
  //新增搜索历史
  addSearchHistroy(value) {
    wx.cloud.callFunction({
      name: 'addSearchHistroy',
      data: {
        userid: app.globalData.userinfo.userid,
        keyword: value,
        date: util.formatDate(new Date())
      }
    })
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
    this.addSearchHistroy(this.data.searchstr);
    this.getResultByKeyword(this.data.searchstr);
    this.setData({
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
    var keyword = e.target.dataset.key;
    if (!!keyword) {
      this.addSearchHistroy(keyword);
      this.getResultByKeyword(keyword);
      //跳转本页面，刷新数据
      this.setData({
        searchstr: keyword,
        currentTab:0
      })
    } else {
      wx.showToast({
        title: '未输入搜索条件',
      })
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
