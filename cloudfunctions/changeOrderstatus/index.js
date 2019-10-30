// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
 //event.type==按钮类型
 //event.orderid==订单id
 //event.goodid==商品id
  const data=[];
  if (event.type=='cancel'){
   await db.collection("oder_info").doc(event.orderid)
    .update({
      data:{
        status:'zm003002'
      }
    }).then(res=>{
      let per = db.collection("oder_info")
      .where({
        _id: event.orderid
      }).get().then(g=>{
        return db.collection("good_info").doc(event.goodid)
          .update({
            data: {
              invnum: _.inc(g.data[0].ordernum),
              ordernum: _.inc(-g.data[0].ordernum)
            }
          }).then(r => {
            return {
              status: 1,
              message: "success"
            }
          }).catch(err=>{
            return {
              status: 0,
              message: "fail"
            }
          })
      })
      data.push(per);
    })
    return (await Promise.all(data))
  }
  if (event.type == 'complete') {
    await db.collection("oder_info").doc(event.orderid)
      .update({
        data: {
          status: 'zm003003'
        }
      }).then(r => {
        data.push({
          status: 1,
          message: "success"
        })
      }).catch(err => {
        data.push({
          status: 0,
          message: "fail"
        }) 
      })
    return (await Promise.all(data))
  }
}