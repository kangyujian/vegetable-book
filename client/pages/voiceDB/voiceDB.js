Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '录音',
    author: '用户',
  
    allInfo: [],
    openid: "",
    voiceSrc:[],
    realVoice:[],
    voice:[],
    audio:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.cloud.init({//环境初始化
      env: 'vegetablebook-mjoil'
    })
    //获取云端的数据
    wx.cloud.callFunction({
      name: 'getId',
      complete: res => {
        var openId = res.result.openid
        console.log("openid" + openId)
        that.setData({
          openid:openId
        })
        const db = wx.cloud.database()//获取云端数据库的链接
        db.collection('Voice').where({
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
            var downpath=[]
            for(let i=0;i<that.data.allInfo.length;i++){
              downpath.push(that.data.allInfo[i].path)
            }
            console.log("下载的路径为：")
            console.log(downpath)
            wx.cloud.getTempFileURL({
              fileList:downpath,
              success: res => {
                // get temp file URL
                console.log(res.fileList)
                that.setData({
                  realVoice:res.fileList
                })
                var VoiceList=[]
                for(let i=0;i<res.fileList.length;i++){
                  VoiceList.push(res.fileList[i].tempFileURL)
                }
                console.log("voiceList=")
                console.log(VoiceList)
                that.setData({
                  voice: VoiceList
                })
                console.log("页面初次渲染完成")

                var audiolist = []
                console.log("长度:")
                console.log(that.data.voice.length)
                var audiolist=[]
                for(let i=0;i<that.data.voice.length;i++){
                  audiolist.push(wx.createAudioContext(i+""))
                }
                that.setData({
                  audio: audiolist
                })
                console.log("audiolist=")
                console.log(that.data.audio)
              },
              fail: err => {
                // handle error
              }
            })
            /////////////////////////////
           
          }
        
        })
      }
    })
   //////////////////////////////////////////////////////////
   
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    //audio
    

    
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
  audioPlay:function(e) {
    // audio
    var index = e.currentTarget.dataset.selectindex; 
    var aduios=this.data.audio[index]
    console.log(aduios)
    aduios.play()
    
   
  },
  audioPause(e) {
    var index = e.currentTarget.dataset.selectindex;
    var aduios = this.data.audio[index]
    console.log(aduios)
    aduios.pause()
  },
  audio14(e) {
    var index = e.target.id
    this.audio[index].seek(14)
  },
  audioStart(e) {
    var index = e.currentTarget.dataset.selectindex;
    var aduios = this.data.audio[index]
    console.log(aduios)
    aduios.seek(0)
  },
  test:function(e){
    console.log(this.data.voiceSrc)
  }
})