// pages/news/news.js
Page({
  data: {

  },
  onLoad(){

  },
  toDetail(e){
    var newid = e.currentTarget.dataset.newid;
    console.log(e);
    wx.navigateTo({
      url: '../news/newsdetail?id='+newid,
    })
  }
})
