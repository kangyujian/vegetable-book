//index.js
//获取应用实例
var app = getApp()

function _item() {
  this.Key = ""
  this.Title = ""
  this.Parse = function (e) {
    return {
      key: this.Key,
      data: this.Title
    }
  }
}

var WANT_KEY = "WANT_"
var util = require('../../utils/util.js');
Page({
  data: {
    motto: '你想要的都会有',
    userInfo: {},
    items: [],
    inputTitle: '',
    time: []
  },

  // 输入的内容
  bindInputTitle: function (e) {
    // console.log(this.data.inputTitle)
    this.setData({
      inputTitle: e.detail.value
    })
  },

  deleteIt: function (e) {
    var index = e.target.id
    var item = this.data.items[index]
    wx.removeStorageSync(item.Key)
    this.data.items.splice(index, 1)
    this.setData({
      items: this.data.items
    })
  },

  addWant: function () {
    console.log('addWant')
    var item = new _item()
    item.Key = WANT_KEY + String(Date.now())
    item.Title = this.data.inputTitle
    var TIME = util.formatTime(new Date())
    var timelist = this.data.time
    timelist.push(TIME)
    this.data.items.push(item)
    this.setData({
      items: this.data.items,
      time: timelist
    })

    wx.setStorage(item.Parse())

    this.setData({
      inputTitle: ""
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    var res = wx.getStorageInfoSync()
    var items = []
    res.keys.map(function (key) {
      if (key.indexOf(WANT_KEY) == 0) {
        var item = new _item()
        item.Key = key
        item.Title = wx.getStorageSync(key)
        items.push(item)
      }
    })
    this.setData({
      items: items
    })
  }
})