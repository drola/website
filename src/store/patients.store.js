import ApiService from '../services/api.service'
import {
  exportTime,
  ApiEndpoint
} from './index'

const state = {
  exportTime: null,
  loaded: false,
  data: [],
}

const getters = {
  data: (state) => {
    return state.data
  },
}

const actions = {
  fetchData: async ({
    commit
  }) => {
    const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3))
    const data = await ApiService.get(`${ApiEndpoint}/api/patients`, threeDaysAgo)
    const d = exportTime(data.headers.timestamp)

    commit('setData', data.data)
    commit('setExportTime', d)
  },

  refreshDataEvery: ({
    dispatch
  }, seconds) => {
    setInterval(() => {
      dispatch('fetchData')
    }, seconds * 1000)
  },
}

const mutations = {
  setData: (state, data) => {
    state.data = data
    state.loaded = true
  },

  setExportTime: (state, exportTime) => {
    state.exportTime = exportTime
  },
}

export const patientsStore = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}