// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const data = [];
  await db.collection("good_info")
    .where({
      name: db.RegExp({
        regexp: event.keyword,
        options: 'i'
      })
    }).get().then(r => {
      for (let i = 0; i < r.data.length; i++) {
        let per1 = db.collection("sysDataType")
          .where({
            Dict_Code: r.data[i].type
          }).get().then(sd => {
            const per = {};
            per._id = r.data[i]._id
            per.filepath = r.data[0].filepath
            per.filepath2 = r.data[0].filepath2
            per.invnum = r.data[0].invnum
            per.name = r.data[0].name
            per.ordernum = r.data[0].ordernum
            per.price = r.data[0].price
            per.service = r.data[0].service
            per.sub = r.data[0].sub
            per.storeid = r.data[0].storeid
            per.typename = sd.data[0].Type_Name
            return per;
          })
        data.push(per1);
      }
    }).catch(err => {
    })

  // await db.collection("sysDataType")
  // .where({
  //   Type_Name:db.RegExp({
  //     regexp: event.keyword,
  //     options:'i'
  //   })
  // }).get().then(r1=>{
  //   //如果是按类型查询
  //   if(r1.data.length>0){
  //     for(let i=0;i<r1.data.length;i++){
  //       let per = db.collection("good_info")
  //         .where(_.or([
  //           {
  //             name: db.RegExp({
  //               regexp: event.keyword,
  //               options: 'i'
  //             })
  //           },
  //           {
  //             type: r1.data[i].Dict_Code
  //           }
  //         ])
  //         ).get().then(res => {
  //           return res.data;
  //         })
  //         data.push(per);
  //     }
  //   }else{//否则按名称查
  //     let per1 = db.collection("good_info")
  //       .where({
  //         name: db.RegExp({
  //           regexp: event.keyword,
  //           options: 'i'
  //         })
  //       }).get().then(res => {
  //         console.log(res);
  //         return res.data;
  //       }).catch(err => {
  //       })
  //     data.push(per1);
  //   }
  // })
  


  return (await Promise.all(data))
}