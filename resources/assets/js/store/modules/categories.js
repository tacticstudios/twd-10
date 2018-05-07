import axios from 'axios'
import * as types from '../mutation-types'

export const namespaced = true

// state
export const state = {
  category: {
    name: '',
    description: ''
  },
  categories: []
}

// mutations
export const mutations = {
  [types.SET_CATEGORY] (state, payload) {
    state.category = payload
  },
  [types.FETCH_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [types.PUSH_CATEGORY] (state, payload) {
    state.categories.push(payload)
  },
  [types.REMOVE_CATEGORIES] (state, payload) {
    state.categories = state.categories
      .filter(function(el) {
          return !payload.includes(el.id)
      })
  },
  [types.CLEAR_CATEGORY] (state) {
    state.category = {
      name: '',
      description: ''
    }
  },
}

// actions
export const actions = {
  async fetchCategories ({ commit }) {
    try {
      const { data } = await axios.get('/api/categories')
      commit(types.FETCH_CATEGORIES, data)
    } catch (e) {
      console.log("Error")
    }
  },
  async saveCategory ({ commit, dispatch }, payload) {
    try {
      const { data } = await axios.post('/api/categories', payload)
      commit(types.PUSH_CATEGORY, data)

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
  async deleteCategory ({ commit }, payload) {
    try {
      let url = '/api/categories/' + payload
      const { data } = await axios.delete(url)
      commit(types.REMOVE_CATEGORIES, [payload])
    } catch (e) {
      console.log(e.message)
    }
  },
  async deleteCategories ({ commit }, payload) {
    try {
      let categories = payload.map((el) => { return el.id })
      const { data } = await axios.post('/api/categories/deleteSelected',
        { categories : categories})
      commit(types.REMOVE_CATEGORIES, categories)
    } catch (e) {
      console.log(e.message)
    }
  },
  setCategory ({ commit }, payload) {
    commit(types.SET_CATEGORY, payload)
  },
  clearCategory ({ commit }) {
    commit(types.CLEAR_CATEGORY)
  },
}

// getters
export const getters = {
  category: state => state.category,
  categories: state => state.categories
}
