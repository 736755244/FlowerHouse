// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let result = [];
    await db.collection('oder_info').where({
      status: _.in(event.typeid),
      userid: event.userid
    }).get().then(r=>{
      for(let i=0;i<r.data.length;i++){
        let per1 = db.collection("good_info")
        .where({
          _id: r.data[i].goodid
        }).get().then(ce=>{
          //拼接数据
          return db.collection("sysDataType")
          .where({
            Dict_Code: r.data[i].status
          }).get().then(sd=>{
            const per = {};
            per.status = r.data[i].status
            per.statusname = sd.data[0].Type_Name
            per.goodid = r.data[i].goodid
            per.orderdate = r.data[i].orderdate
            per.ordernum = r.data[i].ordernum
            per.phone = r.data[i].phone
            per.remark = r.data[i].remark
            per.username = r.data[i].username
            per._id = r.data[i]._id
            per.filepath = ce.data[0].filepath
            per.filepath2 = ce.data[0].filepath2
            per.invnum = ce.data[0].invnum
            per.name = ce.data[0].name
            per.ordernum = ce.data[0].ordernum
            per.price = ce.data[0].price
            per.service = ce.data[0].service
            per.sub = ce.data[0].sub
            per.type = ce.data[0].type
            return per;
          })
        })
        result.push(per1);
      }
    })
  return (await Promise.all(result));
}

