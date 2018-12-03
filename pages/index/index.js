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
    if (user !== undefined && user !== '') {
      this.setData({
        userInfo: JSON.parse(user),
        showDialog: false,
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
  onShow: function() {
    this.setData({
      start: 0,
      pills: [],
    });
    this.getPill(0);
  },
  getUserInfo: function(e) {
    this.setData({
      showDialog: false,
    });
    wx.showLoading({
      title: '正在登錄中',
    });
    const that = this;
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
                  that.setData({
                    userInfo: res.data.data.user,
                  });
                  //todo other thing
                  // loading pill data
                  that.getPill(0);
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
    this.getPill(this.data.start);
  },
  preview: function(e) {
    const id = e.currentTarget.id;
    const pill = this.data.pills[id];
    wx.setStorageSync('preview_pill', JSON.stringify(pill));
    wx.navigateTo({
      url: '../preview/preview',
    });
  },
  getPill: function(start) {
    wx.showNavigationBarLoading();
    http.getPills({
      userId: this.data.userInfo.id,
      start: start,
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
})