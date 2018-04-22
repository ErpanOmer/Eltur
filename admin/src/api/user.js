import request from '@/utils/request'
import config from '@/api/config'

// 获取咨询列表
export function getUsers(query) {
  return request({
    url: config.user,
    method: 'get',
    params: query
  })
}
//  删除评论
export function deleteUser(query) {
  return request({
    url: config.user,
    method: 'delete',
    params: query
  })
}
