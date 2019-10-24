# FlowerHouse
微信小程序-花店
await Promise.all([
    db.collection('oder_info').where({
      status: 'zm003001',
      userid: event.userid
    }).get(),
    db.collection('oder_info').where({
      status: _.in(['zm003002', 'zm003003']),
      userid: event.userid
    }).get(),
    db.collection('oder_info').where({
      status: 'zm003004',
      userid: event.userid
    }).get(),
    db.collection('oder_info').where({
      status: 'zm003005',
      userid: event.userid
    }).get(),
  ]).then(([list1,list2,list3,list4]) => {
   console.log(list1);
   console.log(list2);
    console.log(list3);
    console.log(list4);
  })
