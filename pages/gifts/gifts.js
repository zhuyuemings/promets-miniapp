// pages/gifts/gifts.js
// import {
//   wxPostRequestWithToken
// } from '../../utils/promise.js'
// import {
//   api
// } from '../../api/api.js'

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hBirthday: 0,
    zBirthday: 0,
    engagement: 0,
    marry: 0,
    loved: 0,
    met: 0,
    meetPrefix: '',
    meet: '-'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let date = new Date(this.data.startDate)
    // let now = new Date()
    // let days = (now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)
    // this.setData({
    //   days: parseInt(days)
    // })
    // this.getWeatherInfo()
    this.refreshDays()
    setInterval(this.refreshDays, 10000)

    this.refreshMeet()
    setInterval(this.refreshMeet, 1000)
  },

  refreshDays: function () {
    this.setData({
      hBirthday: this.caculateDays('2020/11/25 00:00:00'),
      zBirthday: this.caculateDays('2020/09/11 00:00:00'),
      engagement: this.caculateDays('2020/01/30 00:00:00'),
      marry: this.caculateDays('2022/11/02 00:00:00'),
      loved: this.caculateDays('2019/11/02 00:00:00'),
      met: this.caculateDays('2019/10/17 00:00:00')
    })

  },
  refreshMeet: function () {
    this.caculateMeet('2020/01/17 13:44:00', '2020/02/10 20:10:00')
  },

  caculateMeet: function (b, e) {
    let begin = new Date(b)
    let end = new Date(e)
    let now = new Date()
    let diff, prefix, meet, over = false
    if (now < begin) {
      // 还未到时间
      prefix = '距下次见面还有'
      diff = -parseInt((new Date().getTime() - begin.getTime()) / 1000)
    } else if (now >= begin && now < end) {
      // 正相见
      prefix = '距本次别离还有'
      diff = -parseInt((new Date().getTime() - end.getTime()) / 1000)
    } else {
      // 已别离
      prefix = '距离上次见面已有'
      diff = parseInt((new Date().getTime() - end.getTime()) / 1000)
      //over = true
    }
    if (!over) {
      let day = parseInt(diff / (24 * 60 * 60))
      let hour = parseInt((diff - day * 24 * 60 * 60) / (60 * 60))
      let min = parseInt((diff - day * 24 * 60 * 60 - hour * 60 * 60) / 60)
      let sec = diff - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60
      meet = (day == 0 ? '' : day + '天') + (hour == 0 ? '' : hour + '时') + (min == 0 ? '' : min + '分') + (sec == 0 ? '' : sec + '秒')
    }

    this.setData({
      meet: meet,
      meetPrefix: prefix
    })
  },

  caculateDays: function (day) {
    let begin = new Date(day)
    let dif = new Date().getTime() - begin.getTime()
    let days = parseInt(dif / (24 * 60 * 60 * 1000))
    return days > 0 ? days + 1 : 1 - days
  },

  // getWeatherInfo() {
  //   let body = {
  //     openId: app.globalData.openId
  //   }
  //   wxPostRequestWithToken(api.gifts.weather, body).then(res => {
  //     console.log(res)
  //     if (res && res.data && res.data.data) {
  //       this.setData({
  //         gifts: res.data.data
  //       })

  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})