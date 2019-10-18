const app = getApp();
Page({
  data: {
    //用户信息（头像、名称等）
    avator: '',
    username: '',
    //other
    showmore:false,
    count1:0,
    count2:2,
    count3:3,
    count4:4
  },
  onLoad(){
    this.setData({
      avator: app.globalData.userinfo.avator,
      username: app.globalData.userinfo.username
    })
  },
  showOrder(e){
    wx.navigateTo({
      url: '../order/order?type=' + e.currentTarget.id,
    })
  },
  viewmore(){
    this.setData({
      showmore:true
    })
  },
  hiddenmore(){
    this.setData({
      showmore: false
    })
  }
})
