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
  setCategory ({ commit }, payload) {
    commit(types.SET_CATEGORY, payload)
  },
}

// getters
export const getters = {
  category: state => state.category,
  categories: state => state.categories
}
