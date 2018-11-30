// pages/timemachine/timemachine.js
const date = require('../../utils/date.js');
const http = require('../../utils/http.js');
Page({

  /**
   * Page initial data
   */
  data: {
    img: '../../icon/time_machine.png',
    times: 3,
    pill: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#060606',
    });
    wx.setNavigationBarTitle({
      title: '時光機',
    });
    const date = wx.getStorageSync('time_machine_date');
    var times = 0;
    if (date === undefined || date === '') {
      times = 3;
      wx.setStorageSync('time_machine_date', this.getToday());
      wx.setStorageSync('time_machine_times', times);
    } else {
      if (date !== this.getToday()) {
        times = 3
      } else {
        times = wx.getStorageSync('time_machine_times');
      }
    }
    this.setData({
      times: times,
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
  getPill: function (e) {
    const time = this.data.times;
    if (time <= 0) {
      wx.showToast({
        title: '今日的穿越次數已用盡，請明天再來吧~~~',
        icon: 'none'
      });
      return;
    } else {
      this.setData({
        img: '../../icon/load.gif',
      });
      const user = JSON.parse(wx.getStorageSync('user_info'));
      http.timeMachine({
        userId: user.id,
      }, (res, err) => {
        this.setData({
          img: '../../icon/time_machine.png',
        })
        if (res !== undefined && res.data.code === 200) {
          this.setData({
            times: time - 1,
          });
          wx.setStorageSync('time_machine_times', time - 1);
          const p = res.data.data.pill;
          if (p === '') {
            wx.showToast({
              title: '什麼都沒遇見...',
              icon: 'none',
            });
          }
          this.setData({
            pill: p,
          });
        } else {
          wx.showToast({
            title: '發生錯誤，請重試',
            icon: 'none',
          });
        }
      })
    }
  },
  preview: function(e) {
    if (this.data.pill.id === undefined) {
      return;
    } else {
      wx.setStorageSync('preview_pill', this.data.pill);
      wx.navigateTo({
        url: '../preview/preview',
      });
    }
  },
  getToday: function() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate();
    return year + '-' + month + '-' + day
  }
})