import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import UX from './UX.vue'
import './stylus/index.styl'

Vue.use(Router)

const router = new Router()
routes(router)
router.start(UX, 'ux')
