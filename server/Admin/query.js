
module.exports = function(param) {
  const key = param.key;
  const value = param.value;
  //  搜索
  const search = param.search;
  //  查询
  const query = {};
  if (key && search) {    //如果有搜索请求就增加查询条件
    //用正则表达式得到的pattern对title属性进行模糊查询
    //这里是搜集合里title属性包含str串的所有结果
    var pattern = new RegExp("^.*"+search+".*$");
    query[key] = pattern;
  }
  if (key && value) {
    if (typeof key === 'string') {
      query[key] = value
    } else {
      for (var i = 0; i < key.length; i++) {
        console.log(key[i], value[i])
        query[key[i]] = value[i]
      }
    }
  }
  const options = {
    sort: { createdTime: -1 },
    lean: true,
    page: param.page || 1,
    limit: param.pageSize || 5
  };
  return { query, options }
}
