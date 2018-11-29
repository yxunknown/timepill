// pages/write/write.js

const http = require('../../utils/http.js');
Page({

  /**
   * Page initial data
   */
  data: {
    pill: {},
    date: '',
    content: '',
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
      const day = d.getDate();
      date = y + "-" + m + "-" + day;
    }
    this.setData({
      date: date,
    });
    wx.setNavigationBarTitle({
      title: '至_' + this.data.date,
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
  input: function(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  postPill: function(e) {
    const user = JSON.parse(wx.getStorageSync('user_info'));
    const date = this.data.date;
    const skin = this.data.pill;
    const content = this.data.content;
    if (content === '') {
      wx.showToast({
        title: '內容不能為空',
        icon: 'none'
      });
      return;
    }
    const data = {
      "user.id": user.id,
      "date": date,
      "content": content,
      "skin.id": skin.id
    };
    var debris = 4;
    if (skin.id > 3) {
      debris = 8;
    }
    http.postPill(data, (res, err) => {
      if (res !== undefined && res.data.code === 200) {
        wx.showToast({
          title: '投遞成功，獲得' + debris + '個碎片',
          icon: 'none'
        });
      } else {
        wx.showToast({
          title: '投遞失敗，請稍候再試...',
          icon: 'none'
        });
      }
    });
    
  }
})