// plugin/customImageMessage/customImageMessage.js
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this);
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  properties: {
    msg: {
      type: Object,
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

  }
})
