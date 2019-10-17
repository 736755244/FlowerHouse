const db = wx.cloud.database();//获取数据库
Page({
  data: {
    
  },
  onLoad(){
  },
  // getQueryCallback回调 返回query与结果
  getQueryCallback: function (e) {
    // console.log(e.detail);
  },
  // goBackHome回调 返回上一级页面
  goBackHome: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})
