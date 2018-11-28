// pages/selectpill/selectpill.js
const http = require('../../utils/http.js');
Page({

  /**
   * Page initial data
   */
  data: {
    pills: [],
    type: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const pillType = wx.getStorageSync('pill_type');
    this.setData({
      type: pillType,
    });
    wx.showNavigationBarLoading();
    http.getAllSkins({
      start: 0,
      limit: 20
    }, (res, err) => {
      wx.hideNavigationBarLoading();
      if (res !== undefined && res.data.code === 200) {
        this.procedure(res.data.data.skins);
      } else {
        wx.showToast({
          title: '加载皮肤失败',
          icon: 'none',
          duration: 1000
        });
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  procedure: function(skins) {
    var i = 0;
    const pills = [];
    for (i = 0; i < skins.length; i++) {
      const skin = skins[i];
      if (skin.price === this.data.type) {
        pills.push(skin);
      }
    }
    this.setData({
      pills: pills,
    });
  },
  pillTab: function(e) {
    console.log(e);
    const id = e.currentTarget.id;
    const selectedPill = this.data.pills[id];
    wx.setStorageSync('pill_select', JSON.stringify(selectedPill));
    wx.navigateTo({
      url: '../write/write',
    });
  }
})