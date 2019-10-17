// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var sid=event.storeid||0;
  return db.collection('store_img').where({storeid:sid}).get();
}