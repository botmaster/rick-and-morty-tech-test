import axios from 'axios'

/* const filtersTypes = {
  NAME: 'name',
  STATUS: 'status',
  SPACIES: 'species',
  TYPE: 'type',
  GENDER: 'gender',
  ALL: 'all',
} */

export default {
  namespaced: true,
  state: {
    characterList: [],
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
      state.characterList = results
      state.info = Object.assign({}, info)
      state.isLoading = false
      state.hasError = false
    },
    RECIEVE_CHARACTER_LIST_FAILED(state, error) {
      state.characterList = []
      state.info = null
      state.isLoading = false
      state.hasError = error
    },
    REQUEST_CHARACTER(state) {
      state.isLoading = true
      state.hasError = false
    },
    RECIEVE_CHARACTER_SUCCESS(state, character) {
      state.characterList = [character]
      state.isLoading = false
      state.hasError = false
    },
    RECIEVE_CHARACTER_FAILED(state, error) {
      state.characterList = []
      state.info = null
      state.isLoading = false
      state.hasError = error
    },
  },
  actions: {
    fetchCharacterList({ commit }, { name, status, page }) {
      commit('REQUEST_CHARACTER_LIST')
      axios
        .get('https://rickandmortyapi.com/api/character/', {
          params: { name, status, page },
        })
        .then((response) => {
          commit('RECIEVE_CHARACTER_LIST_SUCCESS', response.data)
        })
        .catch((error) => {
          console.error(error)
          commit('RECIEVE_CHARACTER_LIST_FAILED', error)
        })
    },

    fetchCharacterById({ commit }, { id } = 1) {
      commit('REQUEST_CHARACTER')
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => {
          commit('RECIEVE_CHARACTER_SUCCESS', response.data)
        })
        .catch((error) => {
          console.error(error)
          commit('RECIEVE_CHARACTER_FAILED', error)
        })
    },
  },
  getters: {
    currentCharacter(state) {
      return state.characterList[0]
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
