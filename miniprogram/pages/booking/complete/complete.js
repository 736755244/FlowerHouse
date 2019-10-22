Page({
  data: {
    orderid:''
  },
  onLoad(option){
    var that=this;
    that.setData({
      orderid: option.orderid
    })
  },
  //查看订单
  viewOrder(){
    wx.redirectTo({
      url: './../../order/order?type=0'
    })
  },
  //返回首页
  backhome(){
    wx.switchTab({
      url: './../../index/index'
    })
  }
})
