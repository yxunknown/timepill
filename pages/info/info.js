// pages/info/info.js
const http = require('../../utils/http.js');
Page({

  /**
   * Page initial data
   */
  data: {
    user: {},
    debris: 0,
    ownPill: 0,
    sendPill: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '個人中心',
    });
    this.setData({
      user: JSON.parse(wx.getStorageSync('user_info')),
    });
    wx.showNavigationBarLoading();
    http.getUserInfo({
      userId: this.data.user.id
    }, (res, err) => {
      wx.hideNavigationBarLoading();
      if (res !== undefined && res.data.code === 200) {
        this.setData({
          debris: res.data.data.debris.amount,
          ownPill: res.data.data.user_skin.length,
          sendPill: res.data.data.pill_count,
        });
      }
    });
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