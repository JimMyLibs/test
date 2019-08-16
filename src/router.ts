import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'match',
      component:  () => import('./pages/Match.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./pages/User.vue'),
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./pages/Video.vue'),
    },
  ],
});
