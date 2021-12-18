import axios from 'axios'

export default {
  namespaced: true,
  state: {
    characterList: [],
    infos: null,
    currentPage: 1,

    isLoading: false,
    hasError: false,
  },
  mutations: {
    REQUEST_CHARACTER_LIST(state) {
      state.isLoading = true
      state.hasError = false
    },
    RECIEVE_CHARACTER_LIST_SUCCESS(state, { results, infos }) {
      state.characterList = results
      state.infos = infos
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
    fetchCharacterList({ commit }, page = 1) {
      commit('REQUEST_CHARACTER_LIST')
      axios
        .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
          commit('RECIEVE_CHARACTER_LIST_SUCCESS', response.data)
        })
        .catch((error) => {
          console.error(error)
          commit('RECIEVE_CHARACTER_LIST_FAILED', error)
        })
    },

    fetchCharacterById({ commit }, id = 1) {
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
  getters: {},
  modules: {},
}
