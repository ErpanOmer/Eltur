import request from '@/utils/request'
import config from '@/api/config'
//  METHODS
export function upload(data) {
  return request({
    url: config.upload,
    method: 'post',
    data: data
  })
}
