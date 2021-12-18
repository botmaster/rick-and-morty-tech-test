import { createStore } from 'vuex'
import { createLogger } from 'vuex'

// Modules
import episodesModule from './modules/episodes.module'
import charactereModule from './modules/charactere.module'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    episodesModule,
    charactereModule,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
