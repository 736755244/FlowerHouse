Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        guideList:this.data.myArray
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  properties: {
    controlSwiper:{
      type:Boolean,
      value:true
    }
  },
  data: {
    myArray: ["自定义内容1", "自定义内容2", "自定义内容3", "自定义内容4"]
  },
  methods: {
    chooseGuide:function(e){
      //点击传入内容
      var content = e.currentTarget.dataset.content;
      this.triggerEvent("chooseGuide", content);
    }
  }
})
