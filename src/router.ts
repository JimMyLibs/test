import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Match',
      component:  () => import('./pages/Match.vue'),
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('./pages/User.vue'),
    },
  ],
});
