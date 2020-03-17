// pages/start.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '致最爱的可爱的未婚妻小黄同学',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function() {
    // if (app.globalData.userId) {
    //   this.setData({
    //     userId: app.globalData.userId,
    //     hasUserId: true
    //   })
    // } else {
    //   // 还没有加载过来 使用回调解决
    //   app.userIdReadyCallback = res => {
    //     this.setData({
    //       userId: app.globalData.userId,
    //       hasUserId: true
    //     })
    //   }
    // }
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // setTimeout(function() {
    //   wx.navigateTo({
    //     url: 'page/index/index'
    //   })
    // }, 200)
    // } else 


    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.saveUserInfo(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/love/love'
          })
        }, 600)
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请升级微信到最新版本后使用！',
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: -1
            })
          } else if (res.cancel) {
            wx.navigateBack({
              delta: -1
            })
          }
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.saveUserInfo(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    setTimeout(function() {
      wx.switchTab({
        url: '/pages/gifts/gifts'
      })
      // console.log('nav')
    }, 600)
  }
})