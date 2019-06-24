//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({
  data: {
    path:""
  },
  //开始录音的时候
  start: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //暂停录音
  pause: function () {
    recorderManager.onPause();
    console.log('暂停录音')
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //上传录音
  upload: function () {
    wx.cloud.init({
      env: 'vegetablebook-mjoil'
    })
    var path = this.tempFilePath
    wx.showLoading({
      title: '上传中...',
    })
    let suffix = /\.[^\.]+$/.exec(path)[0];
    var Cloudpath = 'voice/' + new Date().getTime() + suffix
    wx.cloud.uploadFile({
      // 指定上传到的云路径

      cloudPath: Cloudpath,

      // 指定要上传的文件的小程序临时文件路径
      filePath: path,
      // 成功回调
      success: res => {
        console.log('上传成功', res)
      },
    })
    //在对应的数据库中添加对应的数据域
    /////////////////////
    const db = wx.cloud.database()
    var uppath = "cloud://vegetablebook-mjoil.7665-vegetablebook-mjoil/" +Cloudpath
    db.collection('Voice').add({
      data: {
        path:uppath
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  onLoad: function () {

  },
  goToVoiceDb:function(e){
    wx.navigateTo({
      url: '../voiceDB/voiceDB',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})