
Component({
  relations: {
    './popover': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否有底线
    hasline: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 每项的高度
    height: 40
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick: function() {
      let { index } = this.properties;
      let eventDetail = {
        index: index
      };
      let eventOption = {};
      this.triggerEvent('tap', eventDetail, eventOption);
    }
  }
})
