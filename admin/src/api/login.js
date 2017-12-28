import request from '@/utils/request'
//   API
const LOGIN = '/elturAdmin/Login'
const INFO = '/elturAdmin/Info'
const LOG_OUT = '/elturAdmin/Info'
//  METHODS
export function login(name, password) {
  return request({
    url: LOGIN,
    method: 'post',
    data: {
      name: name,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: INFO,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: LOG_OUT,
    method: 'post'
  })
}
