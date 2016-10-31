/**
 * Created by chuck7 on 16/8/22.
 */
import Main from 'components/Main.vue'
import Search from 'components/Search.vue'
import Report from 'components/Report.vue'
import About from 'components/About.vue'
import Knowledge from 'components/Knowledge.vue'
import Indexheader from  'components/Indexheader.vue'
import { util } from './services/index'
export default (router)=>{
  router.map({
    '/index':{
      component: Indexheader,
      subRoutes: {
        "": {
          component: Main
        },
        "search": {
          component: Search
        }
      }
    },
    '/reports':{
      component: Report,
    },
    '/knowledge':{
      component: Knowledge
    },
    '/about':{
      component: About
    }
  })
  router.redirect({
    '*': '/index'
  })

  router.beforeEach(({from, to, next, redirect}) => {
    if(!to.query.position){
      util.scrollTop()
    }

    if(util.menuIsPoen){
      util.closeMenu()
    }
    next()
  })
}
