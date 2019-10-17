const app=getApp();
const db = wx.cloud.database();
Page({
  data: {
    storeid: app.globalData.storeid,
    list:[]
  },
  onLoad(){
    this.getArticle();
  },
  getArticle(){
    var that=this;
    db.collection('store_artile')
    .where({
      storeid: that.data.storeid
    })
    .get({
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  //文章详情
  toDetail(e){
    var newid = e.currentTarget.dataset.newid;
    wx.navigateTo({
      url: '../news/newsdetail?id='+newid,
    })
  }
})
