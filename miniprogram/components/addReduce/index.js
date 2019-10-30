Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curNum:{
      type:Number,
      value:1
    },
    maxNum:{
      type: Number,
      value: 1
    },
    minNum:{
      type: Number,
      value: 0
    },
    minStatus:{
      type:String,
      value: 'disabled'
    },
    maxStatus: {
      type: String,
      value: 'normal'
    }  
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */
    Minus: function () {
      var num = this.data.curNum;
      if (num > 1) {
        num--;
      }
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      this.setData({
        curNum: num,
        minStatus: minusStatus
      });
      this.triggerEvent("reduceNum", this.data.curNum);
    },
    /* 点击加号 */
    Plus: function () {
      var num = this.data.curNum;
      if (num < this.data.maxNum) {
        num++;
      }
      var maxStatus = num == this.data.maxNum ? 'disabled' : 'normal';
      this.setData({
        curNum: num,
        maxStatus: maxStatus
      });
      this.triggerEvent("addNum", this.data.curNum);
    },
    /* 输入框事件 */
    handleManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回  
      if(num<=this.data.maxNum && num>=this.data.minNum){
        this.setData({
          curNum: num
        });
      }else{
        wx.showToast({
          title: '请输入'+this.data.minNum+'~'+this.data.maxNum,
        })
        return;
      }
    }, 
  }
})
