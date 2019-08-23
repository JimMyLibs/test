import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Match',
      name: 'Match',
      component: () => import('./pages/Match/Index.vue'),
      children: [
        { path: 'byXml', alias: '', name: 'MatchByXml', component: () => import('./pages/Match/MatchByXml.vue') },
        { path: 'byObj', name: 'MatchByObj', component: () => import('./pages/Match/MatchByObj.vue') },
        { path: 'byJson', name: 'MatchByJson', component: () => import('./pages/Match/MatchByJson.vue') },
      ],
    },
    {
      path: '/User',
      name: 'User',
      component: () => import('./pages/User/User.vue'),
    },
    {
      path: '/Video',
      name: 'Video',
      component: () => import('./pages/Video/Video.vue'),
    },
  ],
});
