import request from '@/utils/request'
import config from '@/api/config'
//
export function getNews(query) {
  return request({
    url: config.News,
    method: 'get',
    params: query
  })
}

export function deleteNews(query) {
  return request({
    url: `${config.News}/${query}`,
    method: 'delete'
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
    url: config.News,
    method: 'post',
    data
  })
}
