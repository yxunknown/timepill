//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showDialog: false,
    icons: [
      '../../icon/pill_active.png',
      '../../icon/future.png',
      '../../icon/store.png',
      '../../icon/info.png'
    ],
    currentTab: 0,
    img: '../../icon/time_machine.png',
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '膠囊倉庫',
    });
  },
  tabClick: function(e) {
    //switch tab
    const id = e.target.id;
    var title = '膠囊倉庫';
    var tabIndex = 0;
    switch(id) {
      case 'pill-tab': {
        tabIndex = 0;
        title = '膠囊倉庫';
        break;
      }
      case 'future-tab': {
        tabIndex = 1;
        title = '時光機';
        break;
      }
      case 'store-tab': {
        tabIndex = 2;
        title = '膠囊製作屋';
        break;
      }
      case 'info-tab': {
        tabIndex = 3;
        title = '私人數據';
        break;
      }
      default: {
        tabIndex = 0;
        title = '膠囊倉庫';
      }
    }
    if (tabIndex === 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#060606',
      });
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      });
    }
    if (tabIndex === this.data.currentTab) {
      return false;
    } else {
      wx.setNavigationBarTitle({
        title: '' + title,
      })
      var icon = [
        '../../icon/pill.png',
        '../../icon/future.png',
        '../../icon/store.png',
        '../../icon/info.png'
      ];
      var clickIcon = icon[tabIndex];
      clickIcon = clickIcon.substring(0, clickIcon.length - 4);
      clickIcon += '_active.png';
      icon[tabIndex] = clickIcon;
      this.setData({
        currentTab: tabIndex,
        icons: icon,
      });
    }
  },
  getPill: function(e) {
    this.setData({
      img: '../../icon/load.gif',
    });
  },
  toWrite: function(e) {
    wx.navigateTo({
      url: '../selectday/selectday',
    });
  }
})
