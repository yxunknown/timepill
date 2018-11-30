// pages/store/store.js
const http = require('../../utils/http.js');
Page({

  /**
   * Page initial data
   */
  data: {
    pills: [],
    showRetry: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '膠囊製作屋',
    });
    this.getPills();
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
    wx.showToast({
      title: '666',
    });
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  getPills: function() {
    wx.showNavigationBarLoading();
    http.getAllSkins({
      start: 0,
      limit: 50
    }, (res, err) => {
      wx.hideNavigationBarLoading();
      if (res !== undefined && res.data.code === 200) {
        const pd = res.data.data.skins;
        const skin = [];
        var i = 0;
        for (i = 0; i < pd.length; i++) {
          const s = pd[i];
          if (s.price !== 0) {
            skin.push(s);
          }
        }
        this.setData({
          pills: skin,
        });
      } else {
        wx.showToast({
          title: '加載數據失敗, 請重試...',
          icon: 'none'
        });
        this.setData({
          showRetry: true,
        });
      }
    });
  },
  purse: function(e) {
   const id = e.currentTarget.id;
   const pill = this.data.pills[id];
   const user = JSON.parse(wx.getStorageSync('user_info'));
    wx.showModal({
      title: '提示',
      content: '是否使用 ' + pill.price + ' 個碎片合成\"' + pill.name + '\"',
      confirmText: '確認',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '合成中，請稍候',
          });
          http.purseSkin(pill.id, user.id, (res, err) => {
            wx.hideLoading();
            if (res !== undefined && res.data.code === 200) {
              wx.showToast({
                title: '合成成功，恭喜你獲得' + pill.name,
                icon: 'none',
              });
            } else {
              wx.showToast({
                title: '合成失敗,' + res.data.info,
                icon: 'none',
              });
            }
          });
        } else if (res.cancel) {
         
        }
      }
    });
    // http.purseSkin(pill.id, user.id, (res, err) => {

    // });
  }
})