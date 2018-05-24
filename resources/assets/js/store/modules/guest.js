import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  menus: [],
  products: [],
  product: {},
  quotations: 0,
  quotation_list: []
}

// mutations
export const mutations = {
  [types.FETCH_MENUS] (state, payload) {
    state.menus = payload
  },
  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },
  [types.SET_PRODUCT] (state, payload) {
    state.product = payload
  },
  [types.ADD_TO_QUOTATIONS] (state, payload) {
    state.quotation_list.push(payload)
    state.quotations = state.quotation_list.length
  },
  [types.REMOVE_FROM_QUOTATIONS] (state, payload) {
    let productId = payload.id
    state.quotation_list = state.quotation_list
      .filter(function(el) {
          return el.id != productId
      })
    state.quotations = state.quotation_list.length
  },
  [types.CLEAR_QUOTATIONS] (state) {
    state.quotations = 0
    state.quotation_list = []
  },
}

// actions
export const actions = {
  async sendQuotationRequest ({ commit }, payload) {
    try {
      await axios.post('/api/guest/sendQuotationRequest', payload)
      commit(types.CLEAR_QUOTATIONS)
      alert("Tu pedido de cotización ha sido enviado")
    } catch (e) {
      console.log('Error')
    }
  },
  async fetchMenu ({ commit }) {
    try {
      const { data } = await axios.get('/api/guest/menu')
      commit(types.FETCH_MENUS, data)
    } catch (e) {
      console.log('Error')
    }
  },
  async fetchProducts ({ commit }, id) {
    try {
      const { data } = await axios.get('/api/guest/products?categoryId=' + id)
      commit(types.FETCH_PRODUCTS, data)
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
  },
}

// getters
export const getters = {
  menus: state => state.menus,
  products: state => state.products,
  quotations: state => state.quotations,
  product: state => state.product,
  quotation_list: state => state.quotation_list
}
