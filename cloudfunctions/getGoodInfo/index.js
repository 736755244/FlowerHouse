// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
  await db.collection("good_info")
  .where({
    _id:event.id
  }).get().then(res=>{
    res.data[0].bannerlist = [];
    let dd = db.collection("sysDataType")
      .where({
        Dict_Code: res.data[0].type
      }).get().then(r => {
        res.data[0].typename = r.data[0].Type_Name;
        res.data[0].bannerlist.push(res.data[0].filepath);
        res.data[0].bannerlist.push(res.data[0].filepath2);
        return res.data[0];
      })
    data.push(dd);
  })
  return (await Promise.all(data))
}