const { windowWidth, windowHeight } = wx.getSystemInfoSync();

// 三角形箭头的高度
const trangleHeight = 12;

Component({
  relations: {
    './popover-item': {
      type: 'child'
    }
  },

  data: {
    // 当前显隐状态
    visible: false,
    // popover 宽
    pw: 100,
    // popover 高
    ph: 120,
    // popover 距左距离
    px: 0,
    // popover 距上距离
    py: 0,
    // 垂直方向 top/bottom
    vertical: '',
    // 水平方向 left/center/right
    align: ''
  },

  methods: {
    onDisplay: function(e) {
      let self = this;

      if (self.last && self.last === e.id) {
        self.setData({
          visible: !self.data.visible
        });
      } else {
        wx.createSelectorQuery().selectViewport().scrollOffset(view => {
          let { pw, ph, px, py, vertical, align } = self.data;

          let pOverW = (pw - e.width) / 2;

          let offsetL = e.left,
            offsetR = windowWidth - e.right,
            offsetB = windowHeight - e.bottom;

          if (offsetL >= pOverW && offsetR >= pOverW) {
            align = 'center';
            px = e.left - pOverW;
          } else if (offsetL > pOverW && offsetR < pOverW) {
            align = 'left';
            px = windowWidth - (offsetR + pw);
            // 如果向右贴边了，设置一点距离
            if ((windowWidth - pw) == px) px -= 5;
          } else if (offsetL < pOverW && offsetR > pOverW) {
            align = 'right';
            px = e.left;
            // 如果向左贴边了，设置一点距离
            if (px == 0) px += 5;
          }

          if (offsetB >= (ph + trangleHeight)) {
            vertical = 'bottom';
            py = view.scrollTop + e.bottom + trangleHeight;
          } else {
            vertical = 'top';
            py = view.scrollTop + e.top - ph - trangleHeight;
          }

          self.setData({
            visible: true,
            px: px,
            py: py,
            ph: self.getItemsHeight(),
            vertical: vertical,
            align: align
          });
        }).exec();
      }
      // 记录上一次点击的元素
      self.last = e.id;
    },
    onHide: function() {
      this.setData({
        visible: false
      });
    },
    // 获取所有子元素
    getItems: function() {
      return this.getRelationNodes('./popover-item');
    },
    // 获取所有子元素的总高度
    getItemsHeight() {
      return this.getItems().map(item => item.data.height).reduce((a, b) => a + b, 0);
    }
  }

})