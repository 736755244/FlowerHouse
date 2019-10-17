const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    iconpath:app.globalData.iconpath,
    Height:'',
    imgList:[]
  },
  onLoad(){
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight;
        var calc = clientHeight - 90;
        that.setData({
          Height: calc
        })
      },
    }),
    that.getStoreImg();
  },
  getStoreImg() {
    wx.cloud.callFunction({
      name: 'getStoreImg',
      data: {
        storeid: app.globalData.storeid
      },
      complete: res => {
        this.setData({
          imgList: res.result.data
        })
      }
    })
  }
})
