//增加登录日志
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('zm_log')
    .add({
      data: {
        logName: event.logName,
        logDate: event.logDate
      }
    })
}