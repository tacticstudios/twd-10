import axios from 'axios'
import * as types from '../mutation-types'

export const namespaced = true

// state
export const state = {
  product: {
    name: '',
    description: '',
    amount: '',
    category_id: ''
  },
  products: [],
  photo: ''
}

// mutations
export const mutations = {
  [types.SET_PRODUCT] (state, payload) {
    state.product.id = payload.id
    state.product.name = payload.name
    state.product.description = payload.description
    state.product.amount = payload.amount
    state.product.category_id = payload.category_id
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
    found.amount = payload.amount
    found.category_id = payload.category_id
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
      description: '',
      amount: ''
    }
  },
  [types.SET_PHOTO] (state, payload) {
    state.photo = payload
  },
}

// actions
export const actions = {
  async fetchProducts ({ commit }) {
    try {
      const { data } = await axios.get('/api/products')
      commit(types.FETCH_PRODUCTS, data)
    } catch (e) {
      console.log("Error")
    }
  },
  async saveProduct ({ commit, dispatch }, payload) {
    let product = payload.product
    let photo = payload.photo

    try {
      // const { data } = await axios.post('/api/products', product)
      // commit(types.PUSH_PRODUCT, data)

      var formData = new FormData();
      formData.append("photo", photo);
      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('amount', product.amount)
      formData.append('category_id', product.category_id)
      // /api/files/upload
      const { data } = await axios.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })

      commit(types.PUSH_PRODUCT, data)

      dispatch('responseMessage', {
        type: 'success',
        text: 'Product created!'
      }, {root:true})

    } catch (e) {
      console.log(e.message)

      dispatch('responseMessage', {
        type: 'error',
        text: 'Error Interno'
      }, {root:true})
    }
  },
  async updateProduct ({ commit, dispatch }, payload) {
    let product = payload.product
    let photo = payload.photo

    try {

      var formData = new FormData();
      formData.append("photo", photo);
      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('amount', product.amount)
      formData.append('category_id', product.category_id)
      formData.append('_method', 'PATCH');
      // /api/files/upload
      const { data } = await axios.post('/api/products/' + product.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })

      commit(types.UPDATE_PRODUCT, data)

      dispatch('responseMessage', {
        type: 'success',
        text: 'Product updated!'
      }, {root:true})

    } catch (e) {
      console.log(e.message)
      dispatch('responseMessage', {
        type: 'error',
        text: 'Error Interno'
      }, {root:true})
    }
  },
  async deleteProduct ({ commit }, payload) {
    try {
      let url = '/api/products/' + payload
      const { data } = await axios.delete(url)
      commit(types.REMOVE_PRODUCTS, [payload])
    } catch (e) {
      console.log(e.message)
    }
  },
  async deleteProducts ({ commit }, payload) {
    try {
      let products = payload.map((el) => { return el.id })
      const { data } = await axios.post('/api/products/deleteSelected',
        { products : products})
      commit(types.REMOVE_PRODUCTS, products)
    } catch (e) {
      console.log(e.message)
    }
  },
  setProduct ({ commit }, payload) {
    commit(types.SET_PRODUCT, payload)
  },
  clearProduct ({ commit }) {
    commit(types.CLEAR_PRODUCT)
  },
  setPhoto ({ commit }, payload) {
    commit(types.SET_PHOTO, payload)
  },
}

// getters
export const getters = {
  product: state => state.product,
  products: state => state.products,
  photo: state => state.photo,
}
