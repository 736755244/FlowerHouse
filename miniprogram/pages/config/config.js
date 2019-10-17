const app=getApp();
const db=wx.cloud.database();
var util = require('../../utils/util.js');
Page({
  data: {
    tempFilePaths: [],
    tempFilePath:'',
    storeid: app.globalData.storeid,
    title:'',
    sub:'',
    date: util.formatTime(new Date()),
    num:'',
    con:''
  },
  inputeidt(e){
    console.log(new Date());
    let id = e.currentTarget.dataset.id;
    var value = e.detail.value;
    if(id=="1"){
      this.setData({
        title: value
      })
    }
    if (id == "2") {
      this.setData({
        sub: value
      })
    }
    if (id == "4") {
      this.setData({
        num: value
      })
    }
    if (id == "5") {
      this.setData({
        con: value
      })
    }
  },
  //上传文章缩略图
  uploadartimg() {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      success: res => {
        let tempFilePaths = res.tempFilePaths;//本地临时路径
        that.setData({
          tempFilePaths: tempFilePaths
        })
        //上传
        for (var i = 0; i < tempFilePaths.length; i++) {
          let item = tempFilePaths[i];
          let filename = item.split('.')[item.split('.').length - 2].slice(0, 5);//随机文件名称
          wx.cloud.uploadFile({
            cloudPath: 'artile/' + filename,
            filePath: item, // 文件路径
            success: res => {
              //存入数据库
              that.setData({
                tempFilePath: res.fileID
              })
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
  viewArtile(){
    var sid=this.data.storeid,
    title=this.data.title,
    sub=this.data.sub,
    date=this.data.date,
    num=this.data.num,
    con=this.data.con,
    tfp = this.data.tempFilePath;
    var postdate = {
      storeid: sid,
      title: title,
      sub_title: sub,
      date: date,
      readnum: num,
      content: con,
      filepath: tfp
    };
    console.log(postdate);
    //storeid imgpath title  sub date num con
    db.collection('store_artile').add({
      data: postdate,
      success: function (res) {
        //console.log(res)
      },
      err: function (err) {
        //console.log(err);
      }
    })

  },
  //上传首页轮播图
  uploadbannerimg() {
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
          let filename = item.split('.')[item.split('.').length - 2].slice(0, 5);//随机文件名称
          wx.cloud.uploadFile({
            cloudPath: 'bannerImage/' + filename,
            filePath: item, // 文件路径
            success: res => {
              //存入数据库
              that.AddOrUpdateBannerImage(res.fileID, "banner");
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
  //上传店铺室内图
  uploadstoreimg() {
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
          let filename = item.split('.')[item.split('.').length - 2].slice(0, 5);//随机文件名称
          wx.cloud.uploadFile({
            cloudPath: 'store/' + filename,
            filePath: item, // 文件路径
            success: res => {
              //存入数据库
              that.AddOrUpdateStoreImage(res.fileID,that.data.storeid);
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
  previewImg(e) {
    var that = this;
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
  AddOrUpdateBannerImage(fileID, type) {
    db.collection('banner_img').add({
      data: {
        filePath: fileID,
        type: type
      },
      success: function (res) {
        //console.log(res)
      },
      err: function (err) {
        //console.log(err);
      }
    })
  },
  AddOrUpdateStoreImage(fileID, sid) {
    db.collection('store_img').add({
      data: {
        filePath: fileID,
        storeid: sid
      },
      success: function (res) {
        //console.log(res)
      },
      err: function (err) {
        //console.log(err);
      }
    })
  }
})
