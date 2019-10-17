//获取店长详细信息
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var sid=event.sid;
  var did=event.did;
  return db.collection('dz_info')
  .where({
    storeid:sid,
    _id:did
  }).get();
}