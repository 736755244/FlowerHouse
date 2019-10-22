//获取登录信息
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

exports.main = (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  //先查询用户表中是否有此用户
  return db.collection("zm_user").where({
    open_id: openid
  }).get().then(res=>{
    if(res.data.length>0){//已存在该用户
      var user_id = res.data[0]._id;
      return db.collection('zm_log')
        .add({
          data: {
            logName: event.logName,
            logDate: event.logDate
          }
        }).then(res=>{
          return { userid: user_id}
        })
    }else{//不存在,先添加用户，再写入日志
      return db.collection("zm_user").add({
        data: {
          user_name: event.logName,
          open_id: openid
        }
      }).then(res=>{
        var user_id = res._id;
        return db.collection('zm_log')
          .add({
            data: {
              logName: event.logName,
              logDate: event.logDate
            }
          }).then(res=>{
            return { userid: user_id }
          })
      })
    }
  });
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}
