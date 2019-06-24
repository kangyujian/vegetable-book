// pages/videoDB/videoDB.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realVideoPath:[],//视频的文件的路径
    openid:"",//用户的openid
    allInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.cloud.init({//环境初始化
      env: 'vegetablebook-mjoil'
    })
    //初始化云端环境
    //抓取自己上传的视频
    wx.cloud.callFunction({
      name: 'getId',
      complete: res => {
        var openId = res.result.openid
        console.log("openid" + openId)
        that.setData({
          openid: openId
        })
        const db = wx.cloud.database()//获取云端数据库的链接
        db.collection('video').where({
          _openid: that.data.openid
        }).get({
          success(res) {
            // res.data 是包含以上定义的两条记录的数组 
            console.log(res.data)
            that.setData({
              allInfo: res.data
            })
            console.log("成功抓取数据:")
            console.log(that.data.allInfo)
            //获取云端的播放路径’
            var downpath = []
            for (let i = 0; i < that.data.allInfo.length; i++) {
              downpath.push(that.data.allInfo[i].path)
            }
            console.log("下载的路径是:")
            console.log(downpath)
            wx.cloud.getTempFileURL({
              fileList: downpath,
              success: res => {
                // get temp file URL
                console.log("res.fileList=")
                console.log(res.fileList)
                that.setData({
                  realVideoPath: res.fileList
                })
              },
              fail: err => {
                // handle error
              }
            })

          }

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

  }
})