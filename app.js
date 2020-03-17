// app.js
import {
  wxLogin,
  wxPostRequest,
  wxPostRequestWithToken
} from './utils/promise'
import {
  api
} from './api/api'

App({
  onLaunch: function() {
    this.login()
  },
  globalData: {
    openId: null,
    userInfo: null,
    token: null,
    userId: null
  },
  login: function() {
    wxLogin().then(res => {
      let body = {
        jscode: res.code
      }
      return wxPostRequest(api.login.code2session, body)
    }).then(res => {
      this.globalData.openId = res.data.data.openId
      this.globalData.token = res.data.data.token
      // 此处必须等token获取到后才能执行
      this.wxGetAuthorizedUserInfo()
    })
  },
  wxGetAuthorizedUserInfo: function() {
    // 获取已授权的用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  saveUserInfo: function(userInfo) {
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.synchronizeUserInfo(userInfo)
    }
  },
  synchronizeUserInfo: function(userInfo) {
    let body = {
      openId: this.globalData.openId,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      language: userInfo.language
    }
    wxPostRequestWithToken(api.userinfo.synchronize, body).then(res => {
      if (res.data && res.data.data && res.data.data.userId) {
        this.globalData.userId = res.data.data.userId
      }
      // if (this.userIdReadyCallback) {
      //   this.userIdReadyCallback()
      // }
    })
  },
})