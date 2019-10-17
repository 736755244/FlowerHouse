const app=getApp();
const db = wx.cloud.database();
Page({
  data: {
    iconpath: app.globalData.iconpath,
    Height:'',
    currentTab: 0,
    id:0,//默认当前店长id
    dzlist: [],
    cur_dz:{}//当前店长信息
  },
  onLoad(option) {
    var that = this;
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        var calc = clientHeight - 50;
        that.setData({
          Height: calc
        })
      }
    });
    //
    that.getDzInfo(parseInt(option.sid), option.did);
  },
  //获取详细信息
  getDzInfo(sid,did){
    var that=this;
    wx.cloud.callFunction({
      name: 'getDzInfo',
      data: {
        sid: sid,
        did: did
      },
      complete: res => {
        that.setData({
          cur_dz:res.result.data[0]
        })
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  backhome(){
    wx.switchTab({
      url: '../index/index'
    })
  }
})
