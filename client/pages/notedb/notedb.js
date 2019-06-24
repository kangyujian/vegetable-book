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
    content:[],
    time: [],
    openid: "",
    uppath:[],//上传图片的路径,
    allInfo:[]
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
      name:'getId',
      complete:res=>{
        var openId = res.result.openid
        console.log("openid"+openId)
        const db = wx.cloud.database()//获取云端数据库的链接
        db.collection('Article').where({
          _openid:openId
        }).get({
          success(res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
            that.setData({
              allInfo:res.data
            })
            console.log(that.data.allInfo)
          }
        })
      }
    })
    

        

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
      delete: function (e) {
        var that=this
        wx.showLoading({
          title: '正在删除...',
        })
        
        var index = e.target.id//删除信息的下标
        var deleteitem = that.data.allInfo[index]//要删除的条目
        var deleteid=deleteitem._id//要删除条目的云端id
        console.log(deleteid)
        var deletePicture=deleteitem.uppath//获取要删除图片在云存储上的路径
        wx.cloud.init({
          env: 'vegetablebook-mjoil'
        })//初始化环境
        //删除笔记圈中对应数据
        const db = wx.cloud.database()
        var deleteNoteLoopId=""//删除对应笔记圈文档的id
       
       
       
        
       
          // wx.cloud.deleteFile({//删除云存储上的数据
          //   fileList: deletePicture,
          //   success: res => {
          //     // handle success
          //     console.log(res.fileList)
          //   },
          //   fail: console.error
          // })
        
       
        //删除数据库中的数据
    
        console.log(deleteid)
        
        ///////////////////////////////
        db.collection('Article').doc(deleteid).remove({
          success(res) {
            console.log(res.data)
          }
        })
        /////////////////////////////////

        that.data.allInfo.splice(index, 1)
        that.setData({
          allInfo:that.data.allInfo
        })
        //删除当前列表中的信息
        //显示成功
        //删除笔记圈中的信息
        
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })



      }
})