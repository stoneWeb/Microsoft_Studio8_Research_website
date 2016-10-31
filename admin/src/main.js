import './stylus/index.styl'
import Vue from 'vue'
import MessageBox from 'vue-msgbox'
import adminComponent from './Admin.vue'
import { router } from './router'
import { api } from './services'

require('font-awesome/css/font-awesome.min.css')

Object.assign(window, MessageBox)

let _config = JSON.parse(localStorage.getItem('ux-research') || 'null')

if(!_config){
  api.get('config').then(res => {
    window._config = res
    localStorage.setItem('ux-research', JSON.stringify(res))
    router.start(adminComponent, '#app')
  }).catch(err => {
    alert('请求网站配置文件失败,请刷新重试！')
  })
}else{
  window._config = _config
  router.start(adminComponent, '#app')
}
