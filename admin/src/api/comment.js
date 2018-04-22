import request from '@/utils/request'
import config from '@/api/config'

// 获取咨询列表
export function getComments(query) {
  return request({
    url: config.comment,
    method: 'get',
    params: query
  })
}
//  删除评论
export function deleteComment(query) {
  return request({
    url: config.comment,
    method: 'delete',
    params: query
  })
}
