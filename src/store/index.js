import { createStore } from 'vuex'
import { createLogger } from 'vuex'

// Modules
import characterModule from './modules/character.module'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    characterModule,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
