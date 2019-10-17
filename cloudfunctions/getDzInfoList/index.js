//查询店长信息列表
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  //传入门店编码
  var sid = event.storeid||0;
  return db.collection('dz_info').where({storeid: sid}).get()
}