import Vue from 'vue'
import request from './request'
import event from './event'
const html = document.documentElement
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
util.menuIsPoen = false
util.closeMenu = () => {
  util.menuIsPoen = false
  event.trigger('closeMenu')
}
util.openMenu = () => {
  util.menuIsPoen = true
  event.trigger('openMenu')
}
const getPos = (dom) => {
  let y = 0
  while (dom) {
    y += dom.offsetTop
    dom = dom.offsetParent
  }
  return y
}

util.scrollTop = (pos) => {
  if(!pos){
    window.scrollTo(0,0)
  }else{
    let dom = document.querySelector("#"+pos)
    if(dom){
      let y = getPos(dom)
      window.scrollTo(0, y)
    }
  }
}
export { util, event, request }
