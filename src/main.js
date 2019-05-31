import Vue from 'vue'
import App from './App.vue'
import Http from './middleware/fetch/Http'

Vue.mixin({
    methods: {
        ...Http
    }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
