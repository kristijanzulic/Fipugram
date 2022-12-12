import Vue from 'vue'
import Vuex from 'vuex'
import notification from "./modules/notification"

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    notification
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
