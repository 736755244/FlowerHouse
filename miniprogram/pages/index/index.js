const app = getApp();
const db = wx.cloud.database();//获取数据库

Page({
  data: {
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
    dzlist:[
      {
        id:1,
        name:'黄店长',
        dec:'XX区XX路花店   8年老店',
        src:'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDtlJ7gBSjGrNP5BTDuBTjuBUBl.png'
      },
      {
        id: 2,
        name: '张店长',
        dec: 'XX区XX路花店   8年老店',
        src: 'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDvlJ7gBSiF3OavAzDuBTjuBUBl.png'
      },
      {
        id: 3,
        name: '吴店长',
        dec: 'XX区XX路花店   8年老店',
        src: 'http://436052.s81i.faiusr.com/4/101/AFEI1M4aEAQYACDylJ7gBSiU_69zMO4FOO4FQGU.png'
      },
    ]
  },
  onLoad: function() {
    var that=this;
    that.getBannerList();
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
      url: '../card/card?id=' + e.currentTarget.id
    })
  },
  //店长列表
  showall(){
    wx.navigateTo({
      url: '../card/cardlist',
    })
  },
  showmenu(){
    //搜索方法(或者采用$('body').find()方法，下面方法得不到dom元素)
    // self.SearchForKey = function (e) {
    //   var layer = $("#uniqName_5_1");
    //   var $dom = $("#uniqName_5_8");
    //   if ($dom.hasClass("left")) {
    //     $dom.removeClass("left").addClass("right");
    //     layer.removeClass("moved_right").addClass("move_right");
    //   } else {
    //     $dom.removeClass("right").addClass("left");
    //     layer.removeClass("move_right").addClass("moved_right");
    //   }
    // }
  }
})

//'http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACCRu87jBSiwpM_3BzDuBTjoAkBl.jpg'
//'http://436052.s81i.faiusr.com/2/101/AFEI1M4aEAIYACCTu87jBSjwte1IMO4FOOgCQGU.jpg'