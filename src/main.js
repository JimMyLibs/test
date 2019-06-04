import Vue from 'vue'
import App from './App.vue'
import { $get, $post } from './middleware/fetch/Http'

Vue.mixin({
    methods: {
        $get, $post
    }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
