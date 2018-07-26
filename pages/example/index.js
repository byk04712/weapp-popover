

Page({

  onReady: function() {
    this.popover = this.selectComponent('#popover');
  },

  onTap: function (e) {
    // 获取元素的坐标信息
    wx.createSelectorQuery().select('#' + e.target.id).boundingClientRect(res => {
      this.popover.onDisplay(res);
    }).exec();
  },

  onClickA: function (e) {
    console.log('onClick A ', e);
    wx.showToast({
      title: '你点击了A',
      icon: 'none'
    });
    this.popover.onHide();
  },

  onClickB: function (e) {
    console.log('onClick B ', e);
    wx.showToast({
      title: '你点击了B',
      icon: 'none'
    });
    this.popover.onHide();
  },

  onClickC: function (e) {
    console.log('onClick C ', e);
    wx.showToast({
      title: '你点击了C',
      icon: 'none'
    });
    this.popover.onHide();
  }

})