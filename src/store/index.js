import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth"
import card from "./card"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    card
  }
})
