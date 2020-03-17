// pages/smile/smile.js
import {
  wxGetRequest4Hitokoto
} from '../../utils/promise.js'
import {
  api
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '@Je',
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIoOX6IfJ8lSIqzWmtxHLMdvPnXJuKC0YnJKrqRoA0rPzbAqmMEXZ4dlTxkfsVS5YOmg7KTd7EypA/132'
    },
    hitokoto: '此处感谢一言网(Hitokoto.cn)提供的一句话服务。',
    // 限制接口请求次数，防止过度调用
    limit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    this.getHitokoto()
  },
  getHitokoto: function() {
    if (this.data.limit) {
      return
    }
    this.setData({
      limit: true
    })
    let that = this
    setTimeout(function() {
      that.setData({
        limit: false
      })
    }, 500)
    let url = api.third.hitokoto + '?encode=text&c=d'
    wxGetRequest4Hitokoto(url).then(res => {
      this.setData({
        hitokoto: res.data
      })
    })
  },
  copyHitokoto: function() {
    wx.setClipboardData({
      data: this.data.hitokoto,
    })
  }
})