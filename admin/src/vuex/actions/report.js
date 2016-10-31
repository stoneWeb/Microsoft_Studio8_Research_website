import * as types from '../mutation_types'
import service from '../../services/report/index'

export const getAllReport = ({ dispatch } ) => {
  return service.getReportList().then(res => {
    if(res.success){
      dispatch(types.RECEIVE_ALL_REPORT, res.data.result)
      if(res.data.result.length){
          dispatch(types.REPORT_FOCUS, 0)
      }
    }else{
      dispatch(types.RECEIVE_ALL_REPORT, [])
      //return Promise.reject()
    }
    return res
  })
}

export const focusOnReport = ({ dispatch }, index) => {
  dispatch(types.REPORT_FOCUS, index)
}

export const deleteReport = ({ dispatch, state }) => {
  let index = state.report.currentReportIndex
  let id = state.report.all[index].id
  if(!id){
    dispatch(types.REPORT_DELETE, index)
    return Promise.resolve()
  }else{
    return service.deleteReport(id).then(res => {
      if(res.success){
        dispatch(types.REPORT_DELETE, index)
        return res
      }
    })
  }
}
export const createReport = ({ dispatch }, data) => {
  dispatch(types.REPORT_ADD, data)
}
export const saveReport = ({ dispatch, state }, data) => {
  const index = state.report.currentReportIndex
  return service.createReport(data).then(res => {
    if(res.success){
      dispatch(types.REPORT_CREATE, {index, data: res.data})
      return res
    }else{
      return Promise.reject()
    }
  })
}
export const updateReport = ({ dispatch, state }, data) => {
  const index = state.report.currentReportIndex
  return service.updateReport(data.id, data).then(res => {
    if(res.success){
      dispatch(types.REPORT_UPDATE, {index, data: res.data})
      return res
    }else{
      return Promise.reject()
    }
  })
}
