// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var fs = require('fs');

  var image = fs.readFileSync("assets/example.jpg").toString("base64");

  // 调用网络图片文字识别, 图片参数为本地图片
  client.webImage(image).then(function (result) {
    console.log(JSON.stringify(result));
  }).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
  });

  // 如果有可选参数
  var options = {};
  options["detect_direction"] = "true";
  options["detect_language"] = "true";

  // 带参数调用网络图片文字识别, 图片参数为本地图片
  client.webImage(image, options).then(function (result) {
    console.log(JSON.stringify(result));
  }).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
  });;

  var url = "http//www.x.com/sample.jpg";

  // 调用网络图片文字识别, 图片参数为远程url图片
  client.webImageUrl(url).then(function (result) {
    console.log(JSON.stringify(result));
  }).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
  });

  // 如果有可选参数
  var options = {};
  options["detect_direction"] = "true";
  options["detect_language"] = "true";

  // 带参数调用网络图片文字识别, 图片参数为远程url图片
  client.webImageUrl(url, options).then(function (result) {
    console.log(JSON.stringify(result));
  }).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
  });;
}