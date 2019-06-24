//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username: "",
    userImage: "",
    title: [],
    content: [],
    time: [],
    openid: "",
    uppath: [],//上传图片的路径,
    allInfo: [],
    hadSelect:"../../images/Select.png",//在已经选择的情况下的图片路径
    noSelcted:"../../images/noSelect.png",//在没有选择该项的时候的路径
    len:0,
    isSelect:[]//选择是否选中的数组

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    /**
     * 获取用户信息
     */
    //获取云端的数据
    //初始化数据
    wx.cloud.init({//环境初始化
      env: 'vegetablebook-mjoil'
    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          username: res.userInfo.nickName,
          userImage: res.userInfo.avatarUrl
        })
      }
    })//获取用户的昵称以及头像
    //获取用户的openid

    wx.cloud.callFunction({
      name: 'getId',
      complete: res => {
        var openId = res.result.openid
        console.log("openid" + openId)
        const db = wx.cloud.database()//获取云端数据库的链接
        db.collection('Article').where({
          _openid: openId
        }).get({
          success(res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
            that.setData({
              allInfo: res.data,
              len:res.data.length
            })
            console.log(that.data.allInfo)
            var chooseArray = []
            for (let i = 0; i < that.data.len; i++) {
              chooseArray.push(false)
            }
            that.setData({
              isSelect:chooseArray
            })
          }
        })
      }
    })
    //添加选择数组
   


  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //获取用户的id

  },
  delete: function (e) {//删除照片
    var that = this
    wx.showLoading({
      title: '正在删除...',
    })
    var index = e.target.id//删除信息的下标
    var deleteitem = that.data.allInfo[index]//要删除的条目
    var deleteid = deleteitem._id//要删除条目的云端id

    var deletePicture = deleteitem.uppath//获取要删除图片在云存储上的路径
    //先删除云端存储的数据
    wx.cloud.init({
      env: 'vegetablebook-mjoil'
    })//初始化环境
    wx.cloud.deleteFile({//删除云存储上的数据
      fileList: deletePicture,
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: console.error
    })
    //删除数据库中的数据
    const db = wx.cloud.database()
    db.collection('Article').doc(deleteid).remove({
      success(res) {
        console.log(res.data)
      }
    })

    that.data.allInfo.splice(index, 1)
    that.setData({
      allInfo: that.data.allInfo
    })
    //删除当前列表中的信息
    //显示成功
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })



  },
  //选择用户想要的图片
  selectWant:function(e){
    console.log(this.data.len)
    console.log(this.data.isSelect)
    let index = e.currentTarget.dataset.selectindex; 
    let select=this.data.isSelect
    select[index]=!select[index]
    this.setData({
      isSelect:select
    })
  }
  ,
  //确定上传
  ensureUp:function(e){
    //初始化环境
    wx.cloud.init({
      env: 'vegetablebook-mjoil'
    })
    //显示正在上传
    wx.showLoading({
      title: '正在上传...',
    })
    var that=this
    const db = wx.cloud.database()
    console.log(that.data.isSelect)
    for(let i=0;i<this.data.len;i++){
      //循环上传
      console.log(i)
      if(this.data.isSelect[i]==true){
        db.collection('NoteLoop').add({
          data: {
           userIcon:that.data.userImage,
           userNickName:that.data.username,//用户的昵称
           userInfo:that.data.allInfo[i],//用户的所有信息
           historyid: that.data.allInfo[i]._id
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })

      }
    }
    wx.showToast({
      title: '上传成功!',
      icon: 'success',
      duration: 2000
    })

  }
})