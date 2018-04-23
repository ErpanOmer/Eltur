import request from '@/utils/request'
import config from '@/api/config'

export function getSwiper(query) {
  return request({
    url: `${config.swiper}/${query}`,
    method: 'get'
  })
}
export function postSwiper(query, data) {
  return request({
    url: `${config.swiper}/${query}`,
    method: 'put',
    data
  })
}
