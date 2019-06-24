// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    sum: event.a + event.b,//event里面放的都是一些用户传递过来的数据，参数a和参数b
    userInfo: event.userInfo //还可以直接获取到用户的openid，这些是腾讯给出来的，并不需要用户去授权，很安全。
  }
}