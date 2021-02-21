// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// router
import router from './router'
// vuex
import store from './vuex/vuex'

// axios
import axios from 'axios'
Vue.prototype.axios = axios;

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// live2d
import live2d from "live2d-vue";
Vue.use(live2d);

// public css file
import './assets/css/style.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount("#app")