// pages/love/love.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshDays()
    setInterval(this.refreshDays, 5000)
  },

  refreshDays: function () {
    let begin = new Date('2020/05/20 00:00:00')
    let dif = new Date().getTime() - begin.getTime()
    let days = parseInt(dif / (24 * 60 * 60 * 1000))
    days = days == 0 ? 1 : days
    this.setData({
      days: days
    })
  },

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