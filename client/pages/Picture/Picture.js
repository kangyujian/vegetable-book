const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    list: ['图片配文字', '图片转文字'],
    clickNumber: 0,
    images:[],
    titleCount:0,//题目的字数
    contentCount:0,//正文的字数
    title:'',//题目的标题
    content:'',//正文的内容
    uppath:[],//上传云端的路径
    time:"",//当前的时间
    currentCity: ''

  },
  chooseImage(e){//选择图片上传
    var that = this //获取上下文
    var upload_picture_list=[]
    upload_picture_list = that.data.images
    //选择图片
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (var i in tempFiles) {
           tempFiles[i]['upload_percent'] = 0
           tempFiles[i]['path_server'] = ''
           upload_picture_list.push(tempFiles[i].path)
           console.log(tempFiles[i])
          
        }
             //显示
        that.setData({
          images: upload_picture_list,
        });
      }
    })

  }
  ,
  previewImage:function(e){//预览照片
    wx.previewImage({
     urls:this.data.images
    })
  }
  ,
  handleTitleInput:function(e){//接受输入的文字内容
    const value=e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    this.setData({
      title:this.data.title,
      titleCount:this.data.titleCount
    })
  }
  ,
  removePicture:function(e)
  {
   var imags=this.data.images
   var index=e.currentTarget.dataset.index
   imags.splice(index,1)
   this.setData({
     images:imags
   })
  }
  ,
  handleContentInput:function(e){//接受正文部分的内容
    const value=e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    this.setData({
      content:this.data.content,
      contentCount:this.data.contentCount
    })
  }
  ,
  //点击上方文字  切换
  centerTap: function (event) {
    //点击的偏移量
    console.log(event);
    var cur = event.detail.x;
    console.log(cur);
    //每个tab选项宽度占15%
    var singleNavWidth = wx.getSystemInfoSync().windowWidth * 200/ 100;
    console.log(singleNavWidth);
    this.setData({
      clickNumber: parseInt(cur / singleNavWidth)
    })
  },
  changeSwipe: function (event) {
    console.log(event);
    var type =
      event.detail.current;
    this.setData({
      clickNumber: type
    });
  },
  removeImage:function(e){//删除图片
    const idx=e.target.dataset.idx
    this.data.images.splice(idx,1)
  }
  ,
  handleImagePreview:function(e){//图片预览
    const idx=e.target.dataset.idx
    const images=this.data.images
    wx.previewImage({
      current:images[idx],
      urls: images,
    })
  }
  ,
  submitForm:function(e){
    var that=this
    var picturtpath=that.data.images
    wx.cloud.init({
      env: 'vegetablebook-mjoil'
    })
    wx.showLoading({
      title: '正在上传...',
    })
    const db=wx.cloud.database()
    var cloudPath=[]
    //上传图片并记录路径
    for (var i = 0; i < picturtpath.length; i++) {
      
      let suffix = /\.[^\.]+$/.exec(picturtpath[i])[0];
      var clouduppath ='pictures/' + new Date().getTime() + suffix
      cloudPath.push("cloud://vegetablebook-mjoil.7665-vegetablebook-mjoil/"+clouduppath)
      wx.cloud.uploadFile({
        // 指定上传到的云路径

        cloudPath: clouduppath,
       
        // 指定要上传的文件的小程序临时文件路径
        filePath: picturtpath[i],
        // 成功回调
        success: res => {
          console.log('上传成功', res)
        },
      })
    }
    this.setData({
      uppath:cloudPath
    })
    console.log(that.uppath)
    var TIME = util.formatTime(new Date())
    
    
    db.collection('Article').add({
      data:{
        title:that.data.title,
        content:that.data.content,
        uppath:cloudPath,
        time:TIME,
        location:that.data.currentCity
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

    
  }
  ,
  onLoad: function () {

///////////////////////////////////////////
    this.getLocation();
    
  },
  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=cFdFuwTQ1aZW5uHrkVOD6RjFU2fedEzk&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);
        var city = res.data.result.formatted_address;
        page.setData({ currentCity: city });
      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },

    })
  }

})