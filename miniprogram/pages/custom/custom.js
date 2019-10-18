const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
Page({
  data: {
    // 初始化警告
    displayWarn: 'display:none',
    picspath:app.globalData.picspath,
    tempUrl:'',
    tempFilePaths:[],
    name:'',
    tel:'',
    coverimg:'',
    message:''
  },
  onLoad(){
    this.getStoreImg();
    //初始化验证规则
    this.initValidate();
  },
  inputedit(e){
    let id = e.currentTarget.dataset.id;
    var val = e.detail.value;
    if(id=="1"){
      this.setData({
        name:val
      })
    }
    if (id == "2") {
      this.setData({
        tel: val
      })
    }
    if (id == "3") {
      this.setData({
        message: val
      })
    }
  },
  /*表单-验证字段*/
  initValidate() {
    /*(配置规则)*/
    const rules = {
      name: {
        required: true,
        rangelength: [2, 10]
      },
      tel: {
        required: true,
        tel:true
      },
      coverimg: {
        required: true,
      },
      message: {
        required: true,
        rangelength: [10, 500]
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '姓名限制为2~10个字符'
      },
      tel: {
        required: '请输入电话',
        tel: '请输入有效的电话号码',
      },
      coverimg: {
        required: '请上传图片'
      },
      message: {
        required: '请输入留言',
        rangelength: '留言限制为10~500个字符'
      },
    };
    // 创建实例对象
    this.WxValidate = app.WxValidate(rules, messages)
  },
  submitForm(e) {
    /*(表单提交校验)*/
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      // this.showModal(error);
      this.showWarnInfo(error)
      return false
    }
    /** 这里添写验证成功以后的逻辑**/
    this.addMessage();
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
  },
  //选择图片
  chooseimg(){
    let that = this;
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths;//本地临时路径
        that.setData({
          tempFilePaths: tempFilePaths
        })
        that.uploadMesImg();
      }
    })
  },
  //上传到服务器
  uploadMesImg(){
    //上传图片到服务器
    let item = this.data.tempFilePaths[0];
    let filename = item.split('.')[item.split('.').length - 2].slice(0, 5);//随机文件名称
    wx.cloud.uploadFile({
      cloudPath: 'mesImg/' + filename,
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
  //增加评论留言
  addMessage(){
    var that=this;
    db.collection('mes_board').add({
      data:{
        username: this.data.name,
        phone:this.data.tel,
        message:this.data.message,
        boardimg:this.data.coverimg,
        date: util.formatTime(new Date())
      },
      success: function (res) {
        that.setData({
          name: '',
          tel: '',
          coverimg: '',
          message: ''
        });
        wx.showToast({
          title: '提交留言成功'
        })
      }
    })
  },
  //获取店铺图片
  getStoreImg(){
    wx.cloud.callFunction({
      name:'getStoreImg',
      data:{
        storeid: app.globalData.storeid
      },
      complete:res=>{
        this.setData({
          tempUrl: res.result.data[0].filePath
        })
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
  //店铺
  toDetail(){
    wx.navigateTo({
      url: '../custom/cusdetail?sid=' + app.globalData.storeid,
    })
  },
  //文章列表
  toNews(){
    wx.navigateTo({
      url: '../news/news',
    })
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