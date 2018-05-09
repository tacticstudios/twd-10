import axios from 'axios'
import * as types from '../mutation-types'


// state
export const state = {
  menus: [],
  quotations: 0
}

// mutations
export const mutations = {
  [types.FETCH_MENUS] (state, payload) {
    state.menus = payload
  },
}

// actions
export const actions = {
  async fetchMenu ({ commit }) {
    try {
      const { data } = await axios.get('/api/guest/menu')
      commit(types.FETCH_MENUS, data)
    } catch (e) {
      console.log("Error")
    }
  }
}

// getters
export const getters = {
  menus: state => state.menus,
  quotations: state => state.quotations
}
