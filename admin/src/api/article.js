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

export function editArticle(query, data) {
  return request({
    url: `${config.News}/${query}`,
    method: 'put',
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
