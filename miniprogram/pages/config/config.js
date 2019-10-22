const app=getApp();
const db=wx.cloud.database();
var util = require('../../utils/util.js');
Page({
  data: {  
    // 初始化警告
    displayWarn: 'display:none',
    tempFilePaths: [],
    storeid: app.globalData.storeid,
    username: '',
    //文章信息
    title:'',
    subtitle:'',
    date: util.formatTime(new Date()),
    readnum:'',
    content: '',
    coverimg:'',
    //商品信息
    gname:'',
    gtype: '',
    gsub: '',
    gprice: '',
    ginvnum: '',
    gservice: '',
    typeList:[]
  },
  onLoad(){
    //获取下拉项
    this.getDropDownList();
    //初始化验证规则
    this.initValidate();
    //获取当前操作人
    this.setData({
      username: app.globalData.userinfo.username||'admin'
    })
  },
  getDropDownList(){
    var that=this;
    wx.cloud.callFunction({
      name:'getDropDownListByID',
      data:{
        typeid:'001'
      },
      success:function(res){
        that.setData({
          typeList: res.result.data
        })
      }
    })
  },
  //下拉项赋值
  getvalue(e){
    this.setData({
      gtype: e.detail.Dict_Code
    })
  },
  //改变文本值
  inputeidt(e) {
    let id = e.currentTarget.dataset.id;
    var value = e.detail.value;
    if (id == "1") {
      this.setData({
        title: value
      })
    }
    if (id == "2") {
      this.setData({
        subtitle: value
      })
    }
    if (id == "4") {
      this.setData({
        readnum: value
      })
    }
    if (id == "5") {
      this.setData({
        content: value
      })
    }
    if (id == "g_1") {
      this.setData({
        gname: value
      })
    }
    if (id == "g_3") {
      this.setData({
        gsub: value
      })
    }
    if (id == "g_4") {
      this.setData({
        gprice: value
      })
    }
    if (id == "g_5") {
      this.setData({
        ginvnum: value
      })
    }
    if (id == "g_6") {
      this.setData({
        gservice: value
      })
    }
  },
  /*表单-验证字段*/
  initValidate() {
    /*(配置规则1)*/
    const rules1 = {
      title: {
        required: true,
        rangelength: [1, 20]
      },
      subtitle: {
        required: true,
        rangelength: [1, 10]
      },
      readnum: {
        required: true,
        number:true
      },
      content: {
        required: true,
        rangelength: [50, 1000]
      },
      coverimg:{
        required: true
      }
    }
    const messages1 = {
      title: {
        required: '请输入文章标题',
        rangelength: '标题限制为1~10个字符'
      },
      subtitle: {
        required: '请输入文章简介',
        rangelength: '简介限制为1~20个字符',
      },
      readnum: {
        required: '请输入阅读数量',
        number:'阅读数量必须是数字'
      },
      content: {
        required: '请输入文章内容',
        rangelength: '文章内容限制为50~1000个字符'
      },
      coverimg:{
        required: '请上传封面'
      }
    };
    this.WxValidate1 = app.WxValidate(rules1, messages1)
    
    /*(配置规则2)*/
    const rules2 = {
      gname: {
        required: true,
        rangelength: [1, 20]
      },
      gsub: {
        required: true,
        rangelength: [1, 10]
      },
      gprice: {
        required: true,
        number: true
      },
      ginvnum: {
        required: true,
        number: true
      },
      gservice: {
        required: true
      },
      coverimg: {
        required: true
      }
    }
    const messages2 = {
      gname: {
        required: '请输入商品名称',
        rangelength: '商品名称限制为1~10个字符'
      },
      gsub: {
        required: '请输入商品简介',
        rangelength: '商品简介限制为1~10个字符'
      },
      gprice: {
        required: '请输入商品价格',
        number: '商品价格为数字'
      },
      ginvnum: {
        required: '请输入商品库存数量',
        number: '商品库存数量为数字'
      },
      gservice: {
        required: '请输入商品名称'
      },
      coverimg: {
        required: '请上传商品图片'
      }
    };
    this.WxValidate2 = app.WxValidate(rules2, messages2)

    /*** 也可以自定义验证规则*/
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    // }, '提示语句')
  },
  //选择缩略图
  chooseimg(e) {
    let that = this;
    var type = e.currentTarget.dataset.type;
    wx.chooseImage({
      count: 1, // 默认9
      success: res => {
        let tempFilePaths = res.tempFilePaths;//本地临时路径
        that.setData({
          tempFilePaths: tempFilePaths
        })
        that.uploadimg(type);
      }
    })
  },
  //上传到服务器
  uploadimg(type) {
    //上传图片到服务器
    let item = this.data.tempFilePaths[0];
    let filename = item.split('.')[item.split('.').length - 2].slice(0, 5);//随机文件名称
    wx.cloud.uploadFile({
      cloudPath: type + '/' + filename,
      filePath: item, // 文件路径
      success: res => {
        //赋值
        this.setData({
          coverimg: res.fileID
        })
        wx.showToast({
          title: '上传成功',
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  //提交商品信息约束验证
  submitGoodForm(e){
    if(this.data.gtype==''){
      wx.showToast({
        title: '请选择商品分类',
      })
      return;
    }
    let params = e.detail.value;
    if (!this.WxValidate2.checkForm(params)) {
      let error = this.WxValidate2.errorList[0];
      this.showWarnInfo(error);
      return false;
    }
    this.addGood();
  },
  //新增商品
  addGood(){
    wx.hideToast();
    var postdate = {
      storeid: this.data.storeid,
      name: this.data.gname,
      type: this.data.gtype,
      sub: this.data.gsub,
      price: parseInt(this.data.gprice),
      invnum: parseInt(this.data.ginvnum),
      ordernum:0,
      service: this.data.gservice,
      filepath: this.data.coverimg,
      createdate: this.data.date
    };
    db.collection('good_info').add({
      data: postdate,
      success: function (res) {
        wx.showToast({
          title: '新增成功',
        });
        this.setData({
          gname: '',
          gtype: '',
          gsub: '',
          gprice: '',
          ginvnum: '',
          gservice: '',
          coverimg:''
        })
      },
      err: function (err) {
      }
    })
  },
  //提交文章约束验证
  submitForm(e) {
    /*(表单提交校验)*/
    const params = e.detail.value;
    if (!this.WxValidate1.checkForm(params)) {
      const error = this.WxValidate1.errorList[0]
      // this.showModal(error);
      this.showWarnInfo(error)
      return false
    }
    /** 这里添写验证成功以后的逻辑**/
    this.addArticle();
  },
  //新增文章
  addArticle(){
    wx.hideToast();
    var postdate = {
      storeid: this.data.storeid,
      title: this.data.title,
      sub_title: this.data.subtitle,
      date: this.data.date,
      readnum: parseInt(this.data.readnum),
      content: this.data.content,
      filepath: this.data.coverimg
    };
    db.collection('store_artile').add({
      data: postdate,
      success: function (res) {
        wx.showToast({
          title: '新增成功',
        });
        this.setData({
          title:'',
          subtitle:'',
          readnum:'',
          content:'',
          coverimg:''
        })
      },
      err: function (err) {
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
  //更新数据-轮播图
  AddOrUpdateBannerImage(fileID, type) {
    db.collection('banner_img').add({
      data: {
        filePath: fileID,
        type: type
      },
      success: function (res) {
        //console.log(res)
        wx.showToast({
          title: '上传成功',
        })
      },
      err: function (err) {
        //console.log(err);
      }
    })
  },
  //更新数据-门店图片
  AddOrUpdateStoreImage(fileID, sid) {
    db.collection('store_img').add({
      data: {
        filePath: fileID,
        storeid: sid
      },
      success: function (res) {
        //console.log(res)
        wx.showToast({
          title: '上传成功',
        })
      },
      err: function (err) {
        //console.log(err);
      }
    })
  },
  //验证失败提示信息弹框
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  /*表单验证->(可自定义验证形式)*/
  showWarnInfo(error) {
    // 当前page是this对象
    let page = this;
    // 延时时间等待
    let delayTime = 1;
    // 延时等待毫秒,现设置为1000
    let delayMillsecond = 2000;
    // 调用显示警告函数
    showWran(page, error, delayTime, delayMillsecond);
  }
})

//定义错误提示的相关信息
function showWran(page, error, delayTime, delayMillsecond) {
  let timesRun = 0;
  let interval = setInterval(function () {
    timesRun += delayTime;
    if (timesRun === delayTime) {
      clearInterval(interval);
    }
    page.setData({
      warnInfo: error.msg,
      displayWarn: 'display:none'
    });
  }, delayMillsecond);
  page.setData({
    warnInfo: error.msg,
    displayWarn: 'display:block'
  });
}