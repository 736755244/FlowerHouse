// plugin/customMusicMessage/customMusicMessage.js
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
  data: {

  },
  methods: {

  }
})
