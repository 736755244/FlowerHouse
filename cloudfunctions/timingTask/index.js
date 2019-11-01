// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  //查询退款中的订单，将订单状态推到已取消005（退款成功==已取消）
  await db.collection("oder_info")
  .where({
    status: 'zm003002'
  }).get().then(res=>{
    if(res.data.length>0){
      for(let i=0;i<res.data.length;i++){
        db.collection("oder_info").doc(res.data[i]._id)
        .update({
          data:{
            status:'zm003005'
          }
        })
      }
    }
  })
}