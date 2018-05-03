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
  [types.REMOVE_CATEGORY] (state, payload) {
    state.categories = state.categories.filter(function(el) {
        return el.id !== payload;
    });
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
  async saveCategory ({ commit }, payload) {
    try {
      const { data } = await axios.post('/api/categories', payload)
      commit(types.PUSH_CATEGORY, data)
    } catch (e) {
      console.log("Error")
    }
  },
  async deleteCategory ({ commit }, payload) {
    try {
      let url = '/api/categories/' + payload
      const { data } = await axios.delete(url)
      commit(types.REMOVE_CATEGORY, payload)
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
