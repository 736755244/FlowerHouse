// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
  await db.collection("search_history")
  .where({
    userid: event.userid,
    keyword: event.keyword
  }).get().then(r1 => {
    //未搜索过改关键词
    if(r1.data.length==0){
      let per1= db.collection("search_history")
        .add({
          data: {
            userid: event.userid,
            keyword: event.keyword,
            date: event.date
          }
        }).then(res=>{
         return {
           status:1,
           mes:'新增成功'
         }
        })
      data.push(per1)
    }else{
      //更新关键词创建时间
      let per = db.collection("search_history").doc(r1.data[0]._id)
      .update({
        data: {
          date: event.date
        }
      }).then(res => {
        return {
          status: 1,
          mes: '更新成功'
        }
      })
      data.push(per)
    }
  })
  return (await Promise.all(data))
}