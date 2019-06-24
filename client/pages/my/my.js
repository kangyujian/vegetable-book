Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    userName:"",
    userImage:"",
    setting:"",
    myInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userName: res.userInfo.nickName,
          userImage: res.userInfo.avatarUrl
        })
      }
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
    
  },
  getInfo: function (e) {
    var that=this
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userName: res.userInfo.nickName,
          userImage: res.userInfo.avatarUrl
        })
      }
    })

  }
})