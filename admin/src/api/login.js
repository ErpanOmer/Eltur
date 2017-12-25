import request from '@/utils/request'
//   API
const LOGIN = '/elturAdmin/Login'
export function login(name, password) {
  return request({
    url: LOGIN,
    method: 'post',
    data: {
      name,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
