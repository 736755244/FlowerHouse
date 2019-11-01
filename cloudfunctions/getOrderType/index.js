// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const data=[];
  await db.collection("sysDataType")
  .where({
    Type_ID:'002'
  }).get().then(res=>{
    data.push({
      type:'all',
      typename:'全部'
    });
    for(let i=0;i<res.data.length;i++){
      let per={};
      per.type = res.data[i].Dict_Code
      per.typename = res.data[i].Type_Name
      data.push(per);
    }
    return data;
  }).catch(err=>{
  })

  return (await Promise.all(data))
}