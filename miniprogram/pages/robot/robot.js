const db = wx.cloud.database();//获取数据库
Page({
  data: {
    show:false,
    tempFilePaths:[]
  },
  onLoad(){
  },
  // getQueryCallback回调 返回query与结果
  getQueryCallback: function (e) {
    // console.log(e.detail);
  },
  // goBackHome回调 返回上一级页面
  goBackHome: function (e) {
    console.log("back");
  },

  //上传图片到云服务器
  uploadimg(){
    let that = this;
    wx.chooseImage({
      count: 5, // 默认9
      success: res => {
        let tempFilePaths = res.tempFilePaths;//本地临时路径
        that.setData({
          tempFilePaths: tempFilePaths
        })
        //上传
        for (var i = 0; i < tempFilePaths.length; i++) {
          let item = tempFilePaths[i];
          let filename = item.split('.')[item.split('.').length-2].slice(0,5);//随机文件名称
          wx.cloud.uploadFile({
            cloudPath: 'bannerImage/' + filename,
            filePath: item, // 文件路径
            success: res => {
              //存入数据库
              that.AddOrUpdateBannerImage(res.fileID,"banner");
            },
            fail: err => {
              // handle error
              console.log(err);
            }
          })
        }


      }
    })
  },
  //预览
  previewImg(e){
    var that=this;
    let i = e.target.dataset.index;//预览图片的编号
    wx.previewImage({
      current: that.data.tempFilePaths[i],//预览图片链接
      urls: that.data.tempFilePaths,//图片预览list列表
      success: function (res) {
        //console.log(res);
      },
      fail: function () {
        //console.log('fail')
      }
    })
  },
  //将图片路径存入数据库
  AddOrUpdateBannerImage(fileID,type){
    db.collection('banner_img').add({
      data: {
        filePath: fileID,
        type:type
      },
      success: function (res) {
        //console.log(res)
      },
      err:function(err){
        //console.log(err);
      }
    })
  }
})
