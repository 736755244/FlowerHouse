const app = getApp();
const db = wx.cloud.database();//获取数据库

Page({
  data: {
    iconpath: app.globalData.iconpath,
    picspath: app.globalData.picspath,
    storeid: app.globalData.storeid,//店铺id
    //固定按钮参数
    laytop:true,
    domshow:false,
    //其它
    addflag: true,  //判断是否显示搜索框右侧部分
    searchstr: '',
    //轮播图参数
    bannerlist: [],
    showBanner:false,
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    //店长list
    dzlist:[]
  },
  onLoad: function() {
    var that=this;
    that.getBannerList();
    that.getDzList();
  },
  //获取banner列表
  getBannerList(){
    var that=this;
    wx.cloud.callFunction({
      name: 'getBanner',
      data:{
        type:'banner'
      },
      complete: res => {
        that.setData({
          bannerlist: res.result.data,
          showBanner: true
        })
      }
    })
  },
  //获取店长列表
  getDzList(){
    var that = this;
    wx.cloud.callFunction({
      name: 'getDzInfoList',
      data: {
        storeid:1
      },
      complete: res => {
        that.setData({
          dzlist: res.result.data
        })
      }
    })
  },
  //点击搜索框直接跳转搜索页面
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  //手动滚动banner
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  //店长详情
  toDz(e){
    wx.navigateTo({
      url: '../card/card?sid='+ this.data.storeid+'&did='+ e.currentTarget.id
    })
  },
  //店长列表
  showall(){
    wx.navigateTo({
      url: '../card/cardlist?storeid=' + this.data.storeid,
    })
  },
  //显示收缩操作内容
  showmenu(){
    var isshow = this.data.domshow;
    this.setData({
      domshow: !isshow
    })
  },
  //机器人
  toRobot(){
    wx.navigateTo({
      url: '../robot/robot',
    })
  },
  //系统配置
  toConfig() {
    wx.navigateTo({
      url: '../config/config',
    })
  }
})