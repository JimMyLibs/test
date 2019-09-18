import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import vueMixin from './resource/vue/mixin';
vueMixin();

Vue.config.productionTip = false;
(window as any).getLanguage = (): string => {
  const LS_language = localStorage.getItem('language');
  return LS_language || 'Eng';
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
