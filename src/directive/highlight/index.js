import Vue from 'vue'
import hljs from 'highlight.js'
Vue.directive('highlight', {
    inserted: function (el) {
        let highlight = el.querySelectorAll('pre code');
        highlight.forEach((block) => {
            hljs.highlightBlock(block)
        })
    }
})