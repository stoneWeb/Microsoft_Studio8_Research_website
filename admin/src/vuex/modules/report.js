import {
  RECEIVE_ALL_REPORT,
  REPORT_FOCUS,
  REPORT_ADD,
  REPORT_UPDATE,
  REPORT_DELETE,
  REPORT_CREATE
} from '../mutation_types'

const state = {
  all: [],
  currentReportIndex: -1,
  currentReportId: null
}

const mutations = {
  [RECEIVE_ALL_REPORT](state, reportList) {
    state.all = reportList
    if(reportList.length === 0){
      state.currentReportId = null
      state.currentReportIndex = -1
    }
  },
  [REPORT_ADD](state, data) {
    state.all.unshift(data)
    state.currentReportIndex = 0
    state.currentReportId = null
  },
  [REPORT_FOCUS](state, index) {
    state.currentReportIndex = index
    state.currentReportId = state.all[index].id
  },
  [REPORT_CREATE](state, data) {
    state.all.splice(data.index, 1, data.data)
    if(state.currentReportIndex == data.index){
      state.currentReportId = data.id
    }
  },
  [REPORT_UPDATE](state, data) {
    state.all[data.index] = data.data
    if(state.currentReportIndex == data.index){
      state.currentReportId = data.id
    }
  },
  [REPORT_DELETE](state, index) {
    state.all.splice(index, 1)
    if(state.all.length){
      state.currentReportId = state.all[0].id
      state.currentReportIndex = 0
    }else{
      state.currentReportId = null
      state.currentReportIndex = -1
    }
  }
}

export default {
  state, mutations
}
