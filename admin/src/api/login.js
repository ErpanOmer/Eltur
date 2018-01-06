import request from '@/utils/request'
import config from '@/api/config'
//  METHODS
export function login(name, password) {
  return request({
    url: config.login,
    method: 'post',
    data: {
      name: name,
      password: password
    }
  })
}

export function getInfo() {
  return request({
    url: config.info,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: config.info,
    method: 'get'
  })
}
