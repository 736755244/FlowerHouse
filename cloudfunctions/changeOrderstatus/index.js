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
  //取消：更改商品数量、推进订单状态(退款中)
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
              message: "取消成功"
            }
          }).catch(err=>{
            return {
              status: 0,
              message: "取消失败"
            }
          })
      })
      data.push(per);
    })
    return (await Promise.all(data))
  }
  //付款：推进订单状态(待取货)
  if (event.type == 'complete') {
    await db.collection("oder_info").doc(event.orderid)
      .update({
        data: {
          status: 'zm003003'
        }
      }).then(r => {
        data.push({
          status: 1,
          message: "付款成功"
        })
      }).catch(err => {
        data.push({
          status: 0,
          message: "付款失败"
        }) 
      })
    return (await Promise.all(data))
  }
  //已取货：推进订单状态(已完成)
  if (event.type == 'confirm') {
    await db.collection("oder_info").doc(event.orderid)
      .update({
        data: {
          status: 'zm003004'
        }
      }).then(r => {
        data.push({
          status: 1,
          message: "取货成功"
        })
      }).catch(err => {
        data.push({
          status: 0,
          message: "操作失败"
        })
      })
    return (await Promise.all(data))
  }
}