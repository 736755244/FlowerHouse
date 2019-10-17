// pages/search/search.js
Page({
  data: {
    searchstr: '',
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
      this.navitoResult(keyword);
    } else {
      return;
    }
  },
  //点击下方快捷搜索
  cmdSearchForKey(e){
    var type = e.target.dataset.curtype;
    if (!!type){
      this.navitoResult(type);
    }else{
      return;
    }
  },
  //跳转到搜索结果页面
  navitoResult(key){
    wx.navigateTo({
      url: '../search/searchresult?searchstr=' + key,
    })
  }
})
