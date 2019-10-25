//获取登录信息
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let data = [];
  let dd = "";
  await db.collection("zm_user").where({
    open_id: openid
  }).get().then(res => {
    let userid = res.data[0]._id;
    let username = res.data[0].user_name;
    if(res.data.length>0){//已存在该用户
      dd=db.collection("zm_log").add({
        data:{
          logDate: db.serverDate(),
          logName: username
        }
      }).then(rr=>{
        return userid;
      })
    }else{//不存在,先添加用户
      dd = db.collection("zm_user").add({
        data: {
          user_name: event.logName,
          open_id: openid
        }
      }).then(r=>{
        let uid=r._id;
        return db.collection("zm_log").add({
          data: {
            logDate: db.serverDate(),
            logName: username
          }
        }).then(rr => {
          return uid;
        })
      })
    }
    data.push(dd);
  })
  return (await Promise.all(data));
}
