import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // ...
  state: {
    date: new Date(),
  },
  getters: {
    getDate: (state) => {
      return state.date;
    }
  },
  mutations: {},
  actions: {}
})
export default store;