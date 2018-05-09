import axios from 'axios'
import * as types from '../mutation-types'

export const namespaced = true

// state
export const state = {
  product: {
    name: '',
    description: ''
  },
  products: []
}

// mutations
export const mutations = {
  [types.SET_PRODUCT] (state, payload) {
    state.product.id = payload.id
    state.product.name = payload.name
    state.product.description = payload.description
  },
  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },
  [types.PUSH_PRODUCT] (state, payload) {
    state.products.push(payload)
  },
  [types.UPDATE_PRODUCT] (state, payload) {
    let found = state.products.find(x => x.id == payload.id);
    found.name = payload.name
    found.description = payload.description
  },
  [types.REMOVE_PRODUCTS] (state, payload) {
    state.products = state.products
      .filter(function(el) {
          return !payload.includes(el.id)
      })
  },
  [types.CLEAR_PRODUCT] (state) {
    state.product = {
      name: '',
      description: ''
    }
  },
}

// actions
export const actions = {
  async fetchCategories ({ commit }) {
    try {
      const { data } = await axios.get('/api/products')
      commit(types.FETCH_PRODUCTS, data)
    } catch (e) {
      console.log("Error")
    }
  },
  async saveCategory ({ commit, dispatch }, payload) {
    try {
      const { data } = await axios.post('/api/products', payload)
      commit(types.PUSH_PRODUCT, data)

      dispatch('responseMessage', {
        type: 'success',
        text: 'Category created!'
      }, {root:true})

    } catch (e) {
      console.log(e.message)

      dispatch('responseMessage', {
        type: 'error',
        text: 'Error Interno'
      }, {root:true})
    }
  },
  async updateCategory ({ commit, dispatch }, payload) {
    try {

      const { data } = await axios.put('/api/products/' + payload.id, payload)
      commit(types.UPDATE_PRODUCT, data)

      dispatch('responseMessage', {
        type: 'success',
        text: 'Category updated!'
      }, {root:true})

    } catch (e) {
      console.log(e.message)
      dispatch('responseMessage', {
        type: 'error',
        text: 'Error Interno'
      }, {root:true})
    }
  },
  async deleteCategory ({ commit }, payload) {
    try {
      let url = '/api/products/' + payload
      const { data } = await axios.delete(url)
      commit(types.REMOVE_PRODUCTS, [payload])
    } catch (e) {
      console.log(e.message)
    }
  },
  async deleteCategories ({ commit }, payload) {
    try {
      let products = payload.map((el) => { return el.id })
      const { data } = await axios.post('/api/products/deleteSelected',
        { products : products})
      commit(types.REMOVE_PRODUCTS, products)
    } catch (e) {
      console.log(e.message)
    }
  },
  setCategory ({ commit }, payload) {
    commit(types.SET_PRODUCT, payload)
  },
  clearCategory ({ commit }) {
    commit(types.CLEAR_PRODUCT)
  },
}

// getters
export const getters = {
  product: state => state.product,
  products: state => state.products
}
