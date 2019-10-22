// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database();

exports.main = async (event, context) => {
  const list = [],type=event.type,storeid=event.storeid;
  if (type == ''){
    await db.collection("good_info").get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        let item = db.collection("sysDataType")
          .where({
            Dict_Code: res.data[i].type
          }).get().then(r => {
            res.data[i].typename = r.data[0].Type_Name;
            return res.data[i];
          })
        list.push(item)
      }
    });
  }else{
    await db.collection("good_info").where({
      type: type,
      storeid: storeid
    }).get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        let item = db.collection("sysDataType")
          .where({
            Dict_Code: res.data[i].type
          }).get().then(r => {
            res.data[i].typename = r.data[0].Type_Name;
            return res.data[i];
          })
        list.push(item)
      }
    });
  }

  return (await Promise.all(list))
}