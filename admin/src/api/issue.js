import request from '@/utils/request'
import config from '@/api/config'

// 获取咨询列表
export function getIssue(query) {
  return request({
    url: config.issue,
    method: 'get',
    params: query
  })
}
//  回复咨询内容
export function replyIssue(data) {
  return request({
    url: config.replyIssue,
    method: 'post',
    data
  })
}
