Page({

  /**
   * 页面的初始数据
  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
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
    
  }
  ,
  goArticle: function (e) {
    wx.navigateTo({
      url: '../Article/Article'
    })
  }
  ,
  goPicture: function (e) {
    wx.navigateTo({
      url: '../Picture/Picture'
    })
  }
  ,
  goVoice: function (e) {
    wx.navigateTo({
      url: '../Voice/Voice'
    })
  }
  ,
  goVideo: function (e) {
    wx.navigateTo({
      url: '../Video/Video'
    })
  },
  todb:function(e){
    wx.navigateTo({
      url: '../notedb/notedb',
    })
  }
  
})