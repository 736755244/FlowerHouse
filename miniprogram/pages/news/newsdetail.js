const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    winHeight: "",
    title:'',
    date:'',
    readnum:'',
    content:''
  },
  onLoad(options) {
    var that = this;
    //获取页面信息
    that.getNewInfo(options.id);
    //高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 150;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  getNewInfo(id){
    var that=this;
    db.collection('store_artile')
    .where({
      _id:id
    }).get({
      success: function (res) {
        that.setData({
          title:res.data[0].title,
          date: res.data[0].date,
          readnum: res.data[0].readnum,
          content: res.data[0].content
        })
        //阅读量加1
        that.addYdNum(id);
      }
    })
  },
  addYdNum(id){
    var num = parseInt(this.data.readnum)+1;
    db.collection('store_artile')
    .doc(id)
    .update({
      data: {
        readnum: num
      }
    })
  }
})
