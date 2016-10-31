import * as types from '../mutation_types'
import service from '../../services/login/index'
import { router } from '../../router'

export function createToken(store, username, password) {
  return service.createToken(username, password).then(res => {
    if(res.success){
      store.dispatch(types.TOKEN_CREATE, res.data)
      this.$router.replace('main')
    }
  })
}
export function deleteToken({ dispatch }){
  dispatch(types.TOKEN_DELETE)
  router.go('login')
}
