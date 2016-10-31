import { api } from '../index'

export default {
  getReportList(query = {}){
    return api.get('reports', query)
  },
  getAllKeyWords(){
    return api.get('keywords')
  },
  createKeyWords(data = {}){
    // {name: ...}
    return api.post('keywords', data)
  },
  createReport(data = {}){
    return api.post('reports', data)
  },
  updateReport(id, data = {}){
    return api.patch('reports/'+id, data)
  },
  deleteReport(id){
    return api.delete('reports/'+id)
  }
}
