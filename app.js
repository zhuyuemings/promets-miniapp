// app.js
import { wxLogin, wxPostRequest, wxPostRequestWithToken } from './utils/promise'
import { api } from './api/api'
import { log } from './utils/logger'

App({
  onLaunch: function () {
    this.login()
  },
  globalData: {
    openid: null,
    userInfo: null,
    token: null,
    userId: null
  },
  login: function () {
    wxLogin().then(res => {
      log('wx.login()调用完成，res=' + JSON.stringify(res))
      let body = {
        jscode: res.code
      }
      return wxPostRequest(api.login.code2session, body)
    }).then(res => {
      log('wx.request()调用完成，res=' + JSON.stringify(res))
      this.globalData.openid = res.data.data.openid
      this.globalData.token = res.data.data.token
      this.wxGetAuthorizedUserInfo()
    })
  },
  wxGetAuthorizedUserInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              log('微信静默授权保存用户信息！')
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                log('wx.getUserInfo()调用完成，res=' + JSON.stringify(res))
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  userInfoReadyCallback: function (res) {
    this.saveUserInfo(res.userInfo)
  },
  saveUserInfo: function (userInfo) {
    if (userInfo) {
      this.globalData.userInfo = userInfo
      log('同步用户信息：userInfo=' + JSON.stringify(userInfo))
      this.synchronizeUserInfo(userInfo)
    }
  },
  synchronizeUserInfo: function (userInfo) {
    let body = {
      openid: this.globalData.openid,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      language: userInfo.language
    }
    log(JSON.stringify(this.globalData.openid))
    log(JSON.stringify(body))
    wxPostRequestWithToken(api.userinfo.synchronize, body).then(res => {
      log('用户信息同步完成！res=' + JSON.stringify(res))
      if (res.data && res.data.data && res.data.data.userId) {
        this.globalData.userId = res.data.data.userId
      }
    })
  },
})