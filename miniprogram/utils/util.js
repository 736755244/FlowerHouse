const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取类型
const prop = Object.prototype.toString;
//格式化数组，只返回非空对象
const formatArr=oldArr=>{
  if (prop.call(oldArr) !="[object Array]" ||oldArr.length==0){
    return;
  }else{
    let newarr=[];
    for(var i=0;i<oldArr.length;i++){
      if (prop.call(oldArr[i] =="[object Array]")){
        for (var j = 0; i < oldArr[i].length; j++) {
          if (prop.call(oldArr[i][j]) == "[object Object]") {
            newarr.push(oldArr[i][j]);
          } else {
            break;
          }
        }
      }
    }
    return newarr;
  }
}

module.exports = {
  formatTime: formatTime,
  formatArr: formatArr
}
