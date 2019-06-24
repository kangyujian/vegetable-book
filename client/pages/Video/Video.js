//index.js
var app = getApp()
var count = 0;
Page({
  data: {
    chooesVideo: '',    //上传视频地址
    tipHide: false,
    chooseTypeHide: true,
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    console.log(options.status)
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('prew_video');
  },/**
   * 上传图片
   */
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: that.data.urls
        })

      }
    })
  },

  /**
   * 上传视频
   */
  chooseVideo: function () {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
      }
    })
  },

  /**
     * 全屏改变
     */
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  },
  ensure:function(e){
    wx.cloud.init({
      env: 'vegetablebook-mjoil'
    })
    var path=this.data.chooesVideo
    wx.showLoading({
      title: '上传中...',
    })
    let suffix = /\.[^\.]+$/.exec(path)[0];
    var cloud ='video/' + new Date().getTime() + suffix
    wx.cloud.uploadFile({
      // 指定上传到的云路径

      cloudPath: cloud,

      // 指定要上传的文件的小程序临时文件路径
      filePath: path,
      // 成功回调
      success: res => {
        console.log('上传成功', res)
      },
    })
    //在音频数据库中留下痕迹数据库
    const db = wx.cloud.database()
    var uppath = "cloud://vegetablebook-mjoil.7665-vegetablebook-mjoil/" + cloud
    db.collection('video').add({
      data: {
        path: uppath
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })



    ////////////////////////////////////////////

    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  }
  ,
  myVideoDB:function(e){
    wx.navigateTo({
      url: '../videoDB/videoDB',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})