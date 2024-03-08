import Vue from 'vue'
import comp from '../components/index'
comp.forEach(item => {
    if(item.compnent.name && item.compnent){
        Vue.component(item.compnent.name, item.compnent)
    }
})