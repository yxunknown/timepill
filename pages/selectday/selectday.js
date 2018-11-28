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
    wx.setStorageSync('pill_type', 0);
    wx.navigateTo({
      url: '../selectpill/selectpill',
    });
  },
  specialDay: function(e) {
    wx.setStorageSync('pill_type', 320);
    wx.navigateTo({
      url: '../selectpill/selectpill',
    })
  },
  bindDateChange: function(e) {
    const date = e.detail.value;
    wx.setStorageSync('pill_date', date);
    wx.setStorageSync('pill_type', 360);
    wx.navigateTo({
      url: '../selectpill/selectpill',
    })
  }
})