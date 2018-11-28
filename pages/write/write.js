// pages/write/write.js
Page({

  /**
   * Page initial data
   */
  data: {
    pill: {},
    date: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      pill: JSON.parse(wx.getStorageSync('pill_select')),
    });
    var date = wx.getStorageSync('pill_date');
    if (date === undefined || date === '') {
      const d = new Date();
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDay();
      date = y + "-" + m + "-" + d;
    }
    this.setData({
      date: date,
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.pill.background.toLowerCase(),
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})