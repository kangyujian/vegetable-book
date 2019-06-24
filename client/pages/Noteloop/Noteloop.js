// pages/Noteloop/Noteloop.js
var root = getApp();
Page({
  goNewsDetail: function (event) {
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({

      url: '.Noteloop_detail/Noteloop_detail'
    })
    console.log("跳转了")
  },
  goUpToNoteLoop:function(event){
    wx.navigateTo({
      url: '../upMyNote/upMyLoop',
    })
  }
  ,

  /**
   * 页面的初始数据
   */
  data: {
    useData: "",
    name: [1, 2, 3, 4, 5],
    initData :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.cloud.init({//环境初始化
      env: 'vegetablebook-mjoil'
    })
    const db = wx.cloud.database()//获取云端数据库的链接
    db.collection('NoteLoop').get({
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          initData:res.data
        })
      }
    })
  }

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ,
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
  onPullDownRefresh: function () {//修复了不可以下拉刷新的bug
    var that = this
    wx.cloud.init({//环境初始化
      env: 'vegetablebook-mjoil'
    })
    const db = wx.cloud.database()//获取云端数据库的链接
    db.collection('NoteLoop').get({
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          initData: res.data
        })
      }
    })//下拉刷新获取数据
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  goNoteloop: function (e) {
    wx.navigateTo({
      url: './Noteloop_detail/Noteloop_detail'
    })
  }
  ,
  onShareAppMessage: function () {

  }
})