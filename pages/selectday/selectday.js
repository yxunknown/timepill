// pages/selectday/selectday.js
const date = require('../../utils/date.js')
Page({

  /**
   * Page initial data
   */
  data: {
    start: date.getTomorrow(),
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '投遞膠囊',
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

  },
  today: function(e) {
    wx.navigateTo({
      url: '../selectpill/selectpill',
    });
  },
  specialDay: function(e) {
    wx.navigateTo({
      url: '../selectpill/selectpill',
    })
  }
})