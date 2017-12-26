import request from '@/utils/request'

export function login(name, password) {
  return request({
    url: '/elturAdmin/Login',
    method: 'post',
    data: {
      name: name,
      password: password
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
