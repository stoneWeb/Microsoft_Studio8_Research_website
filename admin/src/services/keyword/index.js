import { api } from '../index'

export default {
  getAllKeyWords(){
    return api.get('keywords')
  },
  createKeyWords(data = {}){
    // {name: ...}
    return api.post('keywords', data)
  },
  updateKeyWords(id, data = {}){
    // {name: ...}
    return api.patch('keywords/'+id, data)
  },
  deleteKeyWords(id){
    return api.delete('keywords/'+id)
  }
}
