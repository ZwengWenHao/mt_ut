import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routers'
import store from './store'
import './plugins/component'
import '@/styles/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'video.js/dist/video-js.css'
import "videojs-markers";
import "videojs-markers/dist/videojs.markers.css";

import Video from 'video.js'
Vue.prototype.$video = Video

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
