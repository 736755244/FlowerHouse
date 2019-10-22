// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db=cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
  await db.collection("oder_info")
  .add({
    data:{
      userid: event.userid,
      storeid:event.storeid,
      username:event.username,
      phone:event.phone,
      remark:event.remark,
      goodid:event.goodid,
      ordernum:event.ordernum,
      status:'zm002001',
      orderdate: event.orderdate
    }
  }).then(res=>{
    data.push(res._id);
    let dd = db.collection("good_info").doc(event.goodid)
    .update({
      data: {
        invnum: _.inc(-event.ordernum),
        ordernum: _.inc(event.ordernum)
      }
    }).then(res=>{
      return res.stats.updated;
    })
    data.push(dd)
  })
  return (await Promise.all(data))
}