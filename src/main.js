import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import './assets/css/main.css'

export const bus = new Vue();

Vue.config.productionTip = false

store.commit('auth/SET_USER', JSON.parse(localStorage.getItem('user')));
store.commit('card/GET_AND_SET_STORGAE');

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')