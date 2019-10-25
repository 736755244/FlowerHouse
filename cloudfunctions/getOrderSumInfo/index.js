// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
 let data=[];
 await db.collection("sysDataType")
 .where({
   Type_ID:'002'
   }).get().then((r)=>{
     let result=r.data;
     let c1 = db.collection('oder_info').where({
       status: 'zm003001',
       userid: event.userid
     }).get().then(res=>{
       result[0].count = res.data.length;
       return result[0];
     });
     let c2 = db.collection('oder_info').where({
       status: _.in(['zm003002', 'zm003003']),
       userid: event.userid
     }).get().then(res => {
       result[1].count = res.data.length;
       return result[1];
     });
     let c3 = db.collection('oder_info').where({
       status: 'zm003004',
       userid: event.userid
     }).get().then(res => {
       result[2].count = res.data.length;
       return result[2];
     });
     let c4 = db.collection('oder_info').where({
       status: 'zm003005',
       userid: event.userid
     }).get().then(res => {
       result[3].count = res.data.length;
       return result[3];
     });
  
     data.push(c1);
     data.push(c2);
     data.push(c3);
     data.push(c4);
 })
  return (await Promise.all(data));
}

//  await db.collection("sysDataType")
//  .where({
//    Type_ID:'002'
//  }).get().then(res=>{
//    //获取4中订单状态
//    for(var i=0;i<res.data.length;i++){
//      let item = res.data[i];
//      let dd=cloud.callFunction({
//        name:'getOrderList',
//        data:{
//          pcode: res.data[i].Dict_Code,
//          userid:event.userid
//        }
//      }).then(r=>{
//        //此处4中订单类型的数量
//        if (r.result[0].length===0){
//          item.count=0;
//        }else{
//          item.count = r.result[0].length
//        }
//        return item;
//        //以下是直接返回订单数据
//        //return r.reult[0];
//        }).catch(console.error)
//     data.push(dd);
//    }
//  })
//   return (await Promise.all(data));
