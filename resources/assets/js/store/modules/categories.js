import axios from 'axios'
import * as types from '../mutation-types'

export const namespaced = true

// state
export const state = {
  category: {
    name: '',
    description: ''
  },
  categories: [],
  photo: '',
}

// mutations
export const mutations = {
  [types.SET_CATEGORY] (state, payload) {
    state.category.id = payload.id
    state.category.name = payload.name
    state.category.description = payload.description
  },
  [types.FETCH_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [types.PUSH_CATEGORY] (state, payload) {
    state.categories.push(payload)
  },
  [types.UPDATE_CATEGORY] (state, payload) {
    let found = state.categories.find(x => x.id == payload.id);
    found.name = payload.name
    found.description = payload.description
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
  [types.SET_PHOTO] (state, payload) {
    state.photo = payload
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
    let category = payload.category
    let photo = payload.photo

    try {
      var formData = new FormData();
      formData.append("photo", photo);
      formData.append('name', category.name)
      formData.append('description', category.description)
      // /api/files/upload
      const { data } = await axios.post('/api/categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })

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
  async updateCategory ({ commit, dispatch }, payload) {
    let category = payload.category
    let photo = payload.photo

    try {

      var formData = new FormData();
      formData.append("photo", photo);
      formData.append('name', category.name)
      formData.append('description', category.description)
      formData.append('_method', 'PATCH');
      // /api/files/upload
      const { data } = await axios.post('/api/categories/' + category.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })

      commit(types.UPDATE_CATEGORY, data)

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
  setPhoto ({ commit }, payload) {
    commit(types.SET_PHOTO, payload)
  },
}

// getters
export const getters = {
  category: state => state.category,
  categories: state => state.categories,
  photo: state => state.photo,
}
