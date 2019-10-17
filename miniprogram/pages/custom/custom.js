// pages/custom/custom.js
Page({
  data: {

  },
  toDetail(){
    wx.navigateTo({
      url: '../custom/cusdetail',
    })
  },
  toNews(){
    wx.navigateTo({
      url: '../news/news',
    })
  }
})
