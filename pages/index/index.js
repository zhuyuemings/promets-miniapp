//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用Promets！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId: null,
    hasUserId: false
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userId) {
      this.setData({
        userId: app.globalData.userId,
        hasUserId: true
      })
    } else {
      // 还没有加载过来 使用回调解决
      app.userIdReadyCallback = res => {
        this.setData({
          userId: app.globalData.userId,
          hasUserId: true
        })
      }
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.saveUserInfo(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.saveUserInfo(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.saveUserInfo(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
