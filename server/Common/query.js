
module.exports = function(param) {
  //  DB查询语句集合
  const query = {};
  // 根据那个字段搜索
  const key = param.key ? param.key.split('-') : null;
  //  搜索字段的值
  const value = param.value ? param.value.split('-') : null;
  //  匹配类型
  const type = param.type ? param.type.split('-') : null
  //  根据哪个字段排序
  const sort = param.sort ? param.sort : null
  //   排序方式
  const order = param.order ? param.order : null
  //  模糊匹配
  if (key !== null && value !== null && type !== null) {
    for (let i = 0, length = key.length; i < length; i++) {
      query[key[i]] = { [`$${type[i]}`]: value[i] }
    }
  }
  const search = param.search;
  if (key && search) {    //如果有搜索请求就增加查询条件
    //用正则表达式得到的pattern对title属性进行模糊查询
    //这里是搜集合里title属性包含str串的所有结果
    var pattern = new RegExp("^.*"+search+".*$");
    query[key] = pattern;
  }
  const options = {
    sort: sortFormat(sort, order),
    lean: true,
    page: param.page || 1,
    limit: param.pageSize || 20
  };
  return { query, options }
}

function sortFormat(sort, order) {
  if (sort !== null && order !== null) {
    return { [`${sort}`]: Number(order) }
  } else {
    return { createdTime: -1 }
  }
}
