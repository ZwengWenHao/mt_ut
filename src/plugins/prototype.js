import Vue from 'vue'

import 'video.js/dist/video-js.css'
import "videojs-markers";
import "videojs-markers/dist/videojs.markers.css";
import Video from 'video.js'
Vue.prototype.$video = Video

import qs from 'qs'
Vue.prototype.$qs = qs

import moment from 'moment';
Vue.prototype.$moment = moment

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

