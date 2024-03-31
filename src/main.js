import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routers'
import store from './store'
import './plugins/index'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

