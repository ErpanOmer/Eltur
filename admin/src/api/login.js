import request from '@/utils/request'
//   API
const LOGIN = '/elturAdmin/Login'
const INFO = '/elturAdmin/Info'
const LOG_OUT = '/elturAdmin/Logout'
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

export function getInfo() {
  return request({
    url: INFO,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: LOG_OUT,
    method: 'get'
  })
}
