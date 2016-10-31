import { api } from '../index'

export default {
  getUsertList(query = {}){
    return api.get('users', query)
  },
  createUser(data = {}){
    // {authority: ..., username, password, name}
    return api.post('users', data)
  },
  updateUser(id, data = {}){
    return api.patch('users/'+id, data)
  },
  deleteUser(id){
    return api.delete('reports/'+id)
  }
}
