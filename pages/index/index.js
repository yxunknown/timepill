//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showDialog: true,
    currentTab: 0,
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '膠囊倉庫',
    });
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
      console.log(e);
      const nickname = e.detail.userInfo.nickName;
      const profile = e.detail.userInfo.avatarUrl;
      console.log(nickname);
      console.log(profile);
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: 'https://mevur.bennkyou.top:8078/pills/login',
              data: {
                code: res.code,
                'nickname': nickname,
                'profile': profile
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success(data) {
                console.log(data);
                if (data.data.code === 200) {
                  wx.setStorage({
                    key: 'user_info',
                    data: JSON.stringify(data.data.data.user),
                  });
                  //todo other thing
                  wx.hideLoading();
                } else {
                  wx.hideLoading();
                  wx.showToast({
                    title: '登錄失敗',
                    icon: 'none',
                  });
                }
              },
              fail() {
                wx.hideLoading();
                wx.showToast({
                  title: '登錄失敗',
                  icon: 'none',
                });
              }
            })
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
  
})