import { api } from '../index'
export default {
  createToken(username, password){
    return api.post('tokens', {username,password})
  }
}
