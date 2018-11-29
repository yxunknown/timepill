//index.js
//获取应用实例
const app = getApp()

const http = require('../../utils/http.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showDialog: true,
    currentTab: 0,
    pills: [],
    start: 0,
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '膠囊倉庫',
    });
    var user = wx.getStorageSync('user_info');
    if (user !== undefined) {
      this.setData({
        userInfo: JSON.parse(user),
        showDialog: false,
      });
      wx.showNavigationBarLoading();
      http.getPills({
        userId: this.data.userInfo.id,
        start: this.data.start,
        limit: 20
      }, (res, err) => {
        wx.hideNavigationBarLoading();
        if (res !== undefined && res.data.code === 200) {
          // get pills success
          const start = this.data.start;
          const pills = this.data.pills;
          var i = 0;
          const pd = res.data.data.pills;
          for (i = 0; i < pd.length; i++) {
            pills.unshift(pd[i]);
          }
          this.setData({
            start: start + 20,
            pills: pills,
          });
        }
      });
    }
  },
  getPill: function(e) {
    this.setData({
      img: '../../icon/load.gif',
    });
  },
  onReady: function() {

  },
  getUserInfo: function(e) {
    this.setData({
      showDialog: false,
    });
    wx.showLoading({
      title: '正在登錄中',
    });
    if (e.detail.errMsg === 'getUserInfo:ok') {
      // get user info success
      const nickname = e.detail.userInfo.nickName;
      const profile = e.detail.userInfo.avatarUrl;
      wx.login({
        success(res) {
          if (res.code) {
            const data = {
              code: res.code,
              'nickname': nickname,
              'profile': profile
            };
            http.login(data, (res, err) => {
                wx.hideLoading();
                if (res.data.code === 200) {
                  wx.setStorage({
                    key: 'user_info',
                    data: JSON.stringify(res.data.data.user),
                  });
                  //todo other thing
                  // loading pill data
                  wx.showNavigationBarLoading();
                  http.getPills({
                    userId: res.data.data.user.id,
                    start: this.data.start,
                    limit: 20
                  }, (res, err) => {
                    wx.hideNavigationBarLoading();
                    if (res !== undefined && res.data.code === 200) {
                      // get pills success
                      const start = this.data.start;
                      const pills = this.data.pills;
                      var i = 0;
                      const pd = res.data.data.pills;
                      for (i = 0; i < pd.length; i++) {
                        pills.unshift(pd[i]);
                      }
                      this.setData({
                        start: start + 20,
                        pills: pills,
                      });
                    }
                  });
                  wx.hideLoading()
                } else {
                  wx.showToast({
                    title: '登錄失敗',
                    icon: 'none',
                  });
                }
              });         
          } else {
            wx.showToast({
              title: '登錄失敗',
              icon: 'none',
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: '獲取用戶信息失敗',
        icon: 'none',
      });
    }
  },
  onPullDownRefresh() {
    http.getPills({
      userId: this.data.userInfo.id,
      start: this.data.start,
      limit: 20
    }, (res, err) => {
      wx.stopPullDownRefresh();
      if (res !== undefined && res.data.code === 200) {
        // get pills success
        const start = this.data.start;
        const pills = this.data.pills;
        if (res.data.data.pills.length > 0) {
          const pd = res.data.data.pills;
          var i = 0;
          for (i = 0; i < pd.length; i++) {
            pills.unshift(pd[i]);
          }
          pills.push(res.data.data.pills);
        } else {
          wx.showToast({
            title: '沒有更多膠囊了',
            icon: 'none',
            duration: 1000,
          });
        }
        this.setData({
          start: start + 20,
          pills: pills,
        });
      }
    });
  }
})