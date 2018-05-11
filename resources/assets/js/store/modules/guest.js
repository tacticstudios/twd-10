import axios from 'axios'
import * as types from '../mutation-types'


// state
export const state = {
  menus: [],
  products: [],
  quotations: 0
}

// mutations
export const mutations = {
  [types.FETCH_MENUS] (state, payload) {
    state.menus = payload
  },
  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
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
  },
  async fetchProducts ({ commit }, id) {
    try {
      const { data } = await axios.get('/api/guest/products?categoryId=' + id)
      commit(types.FETCH_PRODUCTS, data)
    } catch (e) {
      console.log("Error")
    }
  }
}

// getters
export const getters = {
  menus: state => state.menus,
  products: state => state.products,
  quotations: state => state.quotations
}
