// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection("store_artile")
    .where({
      storeid:event.storeid
    }).get().then(r => {
      data.push(r.data);
    })
}