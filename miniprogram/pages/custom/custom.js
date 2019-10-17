const app=getApp();
const db = wx.cloud.database();
Page({
  data: {
    picspath:app.globalData.picspath,
    tempUrl:''
  },
  onLoad(){
    this.getStoreImg();
  },
  getStoreImg(){
    wx.cloud.callFunction({
      name:'getStoreImg',
      data:{
        storeid: app.globalData.storeid
      },
      complete:res=>{
        this.setData({
          tempUrl: res.result.data[0].filePath
        })
      }
    })
  },
  toDetail(){
    wx.navigateTo({
      url: '../custom/cusdetail?sid=' + app.globalData.storeid,
    })
  },
  toNews(){
    wx.navigateTo({
      url: '../news/news',
    })
  }
})
