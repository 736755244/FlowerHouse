const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');

Page({
  data: {
    searchstr: '',//搜索条件
    defaultList:[],//搜索历史
    isEmpty:false
  },
  onShow() {
    var that = this;
    //查询
    that.getDefault();
  },
  onLoad(){
    new app.ToastPannel();
  },
  getDefault(){
    var that=this;
    wx.cloud.callFunction({
      name:'getDefaultSearch',
      data:{
        userid: app.globalData.userinfo.userid,
      }
    }).then(res=>{
      that.setData({
        defaultList:res.result,
        isEmpty: res.result.length==0?true:false
      })
    })
  },
  //新增搜索历史
  addSearchHistroy(value){
    wx.cloud.callFunction({
      name:'addSearchHistroy',
      data:{
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
  //清空搜索框
  activity_clear(e) {
    this.setData({
      searchstr: ''
    })
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //按下键盘上的done或者确认按钮触发==上面搜索框
  cmdsearch(e) {
    var keyword = this.data.searchstr;
    if (keyword) {
      this.addSearchHistroy(keyword);
      this.navitoResult(keyword);
    } else {
      this.showTip({
        icon: "warning",
        content: "请输入搜索内容哦"
      })
      return;
    }
  },
  //点击下方搜索历史
  cmdSearchForKey(e){
    var ketword = e.target.dataset.key;
    this.navitoResult(ketword);
  },
  //跳转到搜索结果页面
  navitoResult(key){
    wx.navigateTo({
      url: '../search/searchresult?searchstr=' + key,
    })
  }
})
