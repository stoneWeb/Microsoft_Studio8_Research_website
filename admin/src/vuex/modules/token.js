import {
  TOKEN_CREATE,
  TOKEN_DELETE
} from '../mutation_types'

const state = {
  user: JSON.parse(sessionStorage.getItem('user') || '{}')
}

const mutations = {
  [TOKEN_CREATE](state, user) {
    state.user = user
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  [TOKEN_DELETE](state) {
    sessionStorage.removeItem('user')
    state.user = null
  }
}

export default {
  state, mutations
}
