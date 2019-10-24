// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 let data=[];
 await db.collection("sysDataType")
 .where({
   Type_ID:'002'
 }).get().then(res=>{
   //获取4中订单状态
   for(var i=0;i<res.data.length;i++){
     let item = res.data[i];
     let dd=cloud.callFunction({
       name:'getOrderList',
       data:{
         pcode: res.data[i].Dict_Code,
         userid:event.userid
       }
     }).then(r=>{
       //此处4中订单类型的数量
       if (r.result[0].length===0){
         item.count=0;
       }else{
         item.count = r.result[0].length
       }
       return item;
       //以下是直接返回订单数据
       //return r.reult[0];
       }).catch(console.error)
    data.push(dd);
   }
 })
  return (await Promise.all(data));
}