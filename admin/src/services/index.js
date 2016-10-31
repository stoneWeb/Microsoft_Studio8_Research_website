import store from '../vuex/store'
import Vue from 'vue'
import { deleteToken } from '../vuex/actions/token'
let parseResponse = (response) => {
  return Promise.all([response.status, response.statusText, response.json()])
},

checkStatus = ([status,statusText,data]) => {
  if(status >= 200 && status < 300){
    return data
  }else{
    if(401 === status){
      if('token expired' === data.error){
        alert('token已过期，请重新登录')
      }else if('invalid token' === data.error){
        deleteToken(store)
      }
    }
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

const api = {
  get (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    let token = store.state.token.user && store.state.token.user.token
    reqHeaders.append('Accept', 'application/json')
    if(token){
      reqHeaders.append('Authorization','Bearer '+token)
    }
    var query = []
    Object.keys(param).forEach(item => {
      query.push(`${item}=${encodeURIComponent(param[item])}`)
    })
    let params = query.length?'?'+query.join('&'):''
    url = host + url + params
    var init = {
      method: 'GET',
      headers: reqHeaders,
      credentials:"include",
      cache: 'default',
      mode:'cors'
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  patch (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    let token = store.state.token.user && store.state.token.user.token
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    if(token){
      reqHeaders.append('Authorization','Bearer '+token)
    }
    url = host + url

    var init = {
      method: 'PATCH',
      headers: reqHeaders,
      credentials:"include",
      mode:'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  post (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    let token = store.state.token.user && store.state.token.user.token
    reqHeaders.append('Content-Type', 'application/json');
    reqHeaders.append('Accept', 'application/json');
    if(token){
      reqHeaders.append('Authorization','Bearer '+token)
    }
    url = host + url
    var init = {
      method: 'POST',
      headers: reqHeaders,
      credentials:"include",
      mode:'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  put (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    let token = store.state.token.user && store.state.token.user.token
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    if(token){
      reqHeaders.append('Authorization','Bearer '+token)
    }
    url = host + url

    var init = {
      method: 'PUT',
      headers: reqHeaders,
      credentials:"include",
      mode:'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  delete (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    let token = store.state.token.user && store.state.token.user.token
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    if(token){
      reqHeaders.append('Authorization','Bearer '+token)
    }
    url = host + url

    var init = {
      method: 'DELETE',
      credentials:"include",
      headers: reqHeaders,
      mode:'cors'
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  }
}
let util = Vue.util.extend({}, Vue.util)
util.copy = function(obj){
    return JSON.parse(JSON.stringify(obj))
}
util.format = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1,                 //月份
    'd+': date.getDate(),                    //日
    'h+': date.getHours(),                   //小时
    'm+': date.getMinutes(),                 //分
    's+': date.getSeconds(),                 //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}
export { api, util }
