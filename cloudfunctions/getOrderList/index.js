// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
    await db.collection('oder_info').where({
      status: 'zm003001',
      userid: event.userid
    }).get().then(res=>{
      console.log(res);
      for(var i=0;i<res.data.length;i++){
        db.collection("good_info")
        .where({
          _id: res.data[i].goodid
        }).get().then(res=>{
          console.log(res);
        })
      }


      data.push(res.data);
    })

  // await Promise.all([
  //   db.collection('oder_info').where({
  //     status: 'zm003001',
  //     userid: event.userid
  //   }).get(),
  //   db.collection('oder_info').where({
  //     status: _.in(['zm003002', 'zm003003']),
  //     userid: event.userid
  //   }).get(),
  //   db.collection('oder_info').where({
  //     status: 'zm003004',
  //     userid: event.userid
  //   }).get(),
  //   db.collection('oder_info').where({
  //     status: 'zm003005',
  //     userid: event.userid
  //   }).get(),
  // ]).then(([r1, r2, r3, r4]) => {
   

  //   data.push(r1);
  //   data.push(r2);
  //   data.push(r3);
  //   data.push(r4);
  //   })
  // return data;



  // await db.collection("sysDataType")
  // .where({
  //   Type_ID:'003',
  //   ParentCode:event.pcode
  // }).get().then(r1=>{
  //   for (var i = 0; i < r1.data.length; i++) {
  //     return db.collection("oder_info")
  //       .where({
  //         status: r1.data[i].Dict_Code,
  //         userid: event.userid
  //       }).get().then(r2 => {
  //         if (r2.data.length != 0) {
  //           let ginfo = r2.data;
  //           for (var ii = 0; ii < ginfo.length; ii++) {
  //             await db.collection("good_info")
  //               .where({
  //                 _id: r2.data[0].goodid
  //               }).get().then(r3 => {
  //                 ginfo[ii].goodinfo= r3.data[0];
  //               })
  //           }
  //           return ginfo;
  //         } else {
  //           return [];
  //         }
  //       }).then(([result]) => {
  //         console.log(result);
  //         //data.push(per1);
  //       })
  //   }
  //   return {
  //     data:data
  //   }
  // })
  return (await Promise.all(data));
}