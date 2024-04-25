import Vue from 'vue'
import comp from '../components/index'
comp.forEach(item => {
    if (item.compnent.name && item.compnent) {
        Vue.component(item.compnent.name, item.compnent)
    }
})
// 分割面板
import splitPane from 'vue-splitpane'
Vue.component('SplitPane', splitPane);

// 拖拽
import vuedraggable from 'vuedraggable';
Vue.component('draggable', vuedraggable);

