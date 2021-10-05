import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Page01 from '../views/Page01.vue';

const routes = [
  {
    path: '/:reason?',
    name: 'page01',
    component: Page01,
  },
  {
    path: '/page02',
    name: 'page02',
    component: () => import('../views/Page02.vue'),
  },
  {
    path: '/page03',
    name: 'page03',
    component: () => import('../views/Page03.vue'),
    meta: { isPrivate: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.isPrivate)) {
    const isAuthenticated = store.getters['getterIsAuthenticated'];
    if (isAuthenticated) {
      store.commit('activePageMutation',to.name);
      next();
    } else {
      next({name: 'page01'});
    }
  } else {
    store.commit('activePageMutation',to.name);
    next();
  }
});

export default router;
