import request from '@/utils/request'
import config from '@/api/config'

// 获取咨询列表
export function getSwiper(query) {
  return request({
    url: config.swiper,
    method: 'get',
    params: query
  })
}
//  删除评论
export function postSwiper(data) {
  return request({
    url: config.swiper,
    method: 'post',
    data
  })
}
