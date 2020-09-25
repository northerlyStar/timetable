// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// router
import router from './router'
// vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// axios
import axios from 'axios'
Vue.prototype.axios = axios;

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// public css file
import './assets/css/style.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app")