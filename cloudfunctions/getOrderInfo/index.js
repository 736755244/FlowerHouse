// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db=cloud.database();

exports.main = async (event, context) => {
  const data=[];
  await db.collection("oder_info")
  .where({
    _id:event.id
  }).get().then(res=>{
    let oinfo=res.data[0];
    let dd = db.collection("sysDataType")
    .where({
      Dict_Code: oinfo.status
    }).get().then(r=>{
      oinfo.statusname=r.data[0].Type_Name;
      return oinfo;
    })
    let ds = db.collection("good_info")
    .where({
      _id: oinfo.goodid
    }).get().then(rr=>{
      return rr.data[0];
    })
    data.push(dd);
    data.push(ds);
  })
  //返回订单信息和商品信息
  return (await Promise.all(data));
}