const app=getApp();
Page({
  data: {
    iconpath: app.globalData.iconpath,
    storeid:0,
    Height:'',
    listinfo:[]
  },
  onLoad(option){
    var that = this;
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight
        var calc = clientHeight;
        that.setData({
          Height: calc,
          storeid: option.storeid
        });
      }
    });
    that.getDzList(parseInt(option.storeid));
  },
  //获取店长列表
  getDzList(sid) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getDzInfoList',
      data: {
        storeid: sid
      },
      complete: res => {
        that.setData({
          listinfo: res.result.data
        })
      }
    })
  },
  //详情
  toMoreInfo(e){
    wx.navigateTo({
      url: '../card/card?sid=' + this.data.storeid+'&did='+e.currentTarget.id
    })
  }
})
