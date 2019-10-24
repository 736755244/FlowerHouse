// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
  await db.collection("sysDataType")
  .where({
    Type_ID:'003',
    ParentCode:event.pcode
  }).get().then(r1=>{
    for (var i = 0; i < r1.data.length; i++) {
      let per1= db.collection("oder_info")
        .where({
          status: r1.data[i].Dict_Code,
          userid: event.userid
        }).get().then(r2=>{
          if (r2.data.length != 0) {
            let ginfo = r2.data;
            for(var ii=0;ii<ginfo.length;ii++){
              let ts = db.collection("good_info")
                .where({
                  _id: r2.data[0].goodid
                }).get().then(r3 => {
                  return r3.data[0];
                })
              ginfo[ii].goodinfo = ts;
              console.log(ginfo);
            }

            return ginfo;
          }else{
            return [];
          }
        })
      data.push(per1);
    }
  })
  return (await Promise.all(data));
}