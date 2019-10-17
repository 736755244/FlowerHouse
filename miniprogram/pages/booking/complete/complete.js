// pages/booking/complete/complete.js
Page({
  data: {
    cur:''
  },
  changebtn(e){
    this.setData({
      cur: e.currentTarget.id
    })
    switch (e.currentTarget.id){
      case 'view':
        wx.redirectTo({
          url: './../../order/order?type=0'
        })
        break;
      case 'back':
        wx.switchTab({
          url: './../../index/index'
        })
        break;
    }
  }
})
