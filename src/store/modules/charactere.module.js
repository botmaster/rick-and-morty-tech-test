import axios from 'axios'
import { api } from '../../config/api.js'

export default {
  namespaced: true,
  state: {
    characterList: [],
    activeCharacter: null,
    info: null,
    filter: null,

    isLoading: false,
    hasError: false,
  },
  mutations: {
    REQUEST_CHARACTER_LIST(state) {
      state.isLoading = true
      state.hasError = false
    },
    RECIEVE_CHARACTER_LIST_SUCCESS(state, { results, info }) {
      state.characterList = [...results]
      state.info = Object.assign({}, info)
      state.activeCharacter = null
      state.isLoading = false
      state.hasError = false
    },
    RECIEVE_CHARACTER_LIST_FAILED(state, error) {
      state.characterList = []
      state.activeCharacter = null
      state.info = null
      state.isLoading = false
      state.hasError = error
    },

    REQUEST_CHARACTER(state) {
      state.isLoading = true
      state.hasError = false
    },
    RECIEVE_CHARACTER_SUCCESS(state, character) {
      state.activeCharacter = Object.assign({}, character)
      state.isLoading = false
      state.hasError = false
    },
    RECIEVE_CHARACTER_FAILED(state, error) {
      state.activeCharacter = null
      state.isLoading = false
      state.hasError = error
    },
  },
  actions: {
    fetchCharacterList({ commit }, { page, name, status }) {
      commit('REQUEST_CHARACTER_LIST')
      axios
        .get(`/character/`, {
          params: { page, name, status },
          baseURL: api.apiUri,
        })
        .then((response) => {
          commit('RECIEVE_CHARACTER_LIST_SUCCESS', response.data)
        })
        .catch((error) => {
          // console.error(error)
          commit('RECIEVE_CHARACTER_LIST_FAILED', error)
        })
    },

    fetchCharacterById({ commit }, { id } = 1) {
      commit('REQUEST_CHARACTER')
      axios
        .get(`/character/${id}`, {
          baseURL: api.apiUri,
        })
        .then((response) => {
          commit('RECIEVE_CHARACTER_SUCCESS', response.data)
        })
        .catch((error) => {
          // console.error(error)
          commit('RECIEVE_CHARACTER_FAILED', error)
        })
    },
  },
  getters: {
    currentCharacter(state) {
      return state.activeCharacter
    },
    characterCount(state) {
      return state.info?.count
    },
    pageCount(state) {
      return state.info?.pages
    },
    hasNextPage(state) {
      return state.info?.next
    },
    hasPrevPage(state) {
      return state.info?.prev
    },
  },
  modules: {},
}
