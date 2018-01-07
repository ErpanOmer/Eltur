import request from '@/utils/request'
import config from '@/api/config'
//
export function fetchList(query) {
  return request({
    url: config.login,
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function postNews(data) {
  return request({
    url: config.postNews,
    method: 'post',
    data
  })
}
