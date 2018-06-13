import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  data: [],
  product: {},
  quotations: 0,
  quotation_list: []
}

// mutations
export const mutations = {
  [types.FETCH_DATA] (state, payload) {
    state.data = payload
  },
  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },
  [types.SET_PRODUCT] (state, payload) {
    state.product = payload
  },
  [types.ADD_TO_QUOTATIONS] (state, payload) {
    const id = payload.id
    const found = state.quotation_list.find(el => el.id === id)
    if (found == null) {
      state.quotation_list.push(payload)
      state.quotations = state.quotation_list.length
    }
  },
  [types.REMOVE_FROM_QUOTATIONS] (state, payload) {
    const productId = payload.id
    state.quotation_list = state.quotation_list
      .filter(function (el) {
        return el.id !== productId
      })
    state.quotations = state.quotation_list.length
  },
  [types.CLEAR_QUOTATIONS] (state) {
    state.quotations = 0
    state.quotation_list = []
  }
}

// actions
export const actions = {
  async sendQuotationRequest ({ commit }, payload) {
    try {
      await axios.post('/api/guest/sendQuotationRequest', payload)
      commit(types.CLEAR_QUOTATIONS)
      alert('Tu pedido de cotización ha sido enviado')
    } catch (e) {
      console.log('Error')
    }
  },
  async fetchData ({ commit }) {
    try {
      const { data } = await axios.get('/api/guest/data')
      commit(types.FETCH_DATA, data)
    } catch (e) {
      console.log('Error')
    }
  },
  async fetchProduct ({ commit }, id) {
    try {
      const { data } = await axios.get('/api/guest/products?id=' + id)
      commit(types.SET_PRODUCT, data)
    } catch (e) {
      console.log('Error')
    }
  },
  addToQuotations ({ commit }, payload) {
    commit(types.ADD_TO_QUOTATIONS, payload)
  },
  removeFromQuotations ({ commit }, payload) {
    commit(types.REMOVE_FROM_QUOTATIONS, payload)
  }
}

// getters
export const getters = {
  data: state => state.data,
  quotations: state => state.quotations,
  product: state => state.product,
  quotation_list: state => state.quotation_list
}
