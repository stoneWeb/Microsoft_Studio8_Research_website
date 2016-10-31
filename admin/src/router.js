import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from 'components/Login/Login.vue'
import MainView from 'components/Main/Main.vue'
import ReportView from 'components/Report/Report.vue'
import KeywordView from 'components/Keyword/Keyword.vue'
import UserView from 'components/User/User.vue'
import store from './vuex/store'

Vue.use(VueRouter)
const router = new VueRouter()
router.map({
  '/login': {
    component: LoginView,
    authPage: true
  },
  '/main': {
    component: MainView
  },
  '/report': {
    component: ReportView
  },
  '/keyword': {
    component: KeywordView
  },
  '/user': {
    component: UserView
  }
})
router.redirect({
  '*': '/main'
})

router.beforeEach(({from, to, next, redirect}) => {

  let user = store.state.token.user
  if(true !== to.authPage) {
    if(!user || !user.token) {
      redirect('login')
    } else {
      next()
    }
  } else {
    if(!user || !user.token) {
      next()
    } else {
      if ('undefined' !== typeof from.path) {
        redirect(from.path)
      } else {
        redirect('main')
      }
    }
  }
})
export { router }
