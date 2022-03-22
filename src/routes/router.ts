import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import MessengerView from '@/views/MessengerView.vue';
import AuthView from '@/views/AuthView.vue';
import ComponentsTesting from '@/views/ComponentsTestingView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MessengerView',
    component: MessengerView,
    // children: [
    //   {
    //     name: 'chats',
    //     path: 'chats/:id',
    //     component: ChatInDepth,
    //   },
    // ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    props: route => ({ query: route.query.jwt }),
  },
  {
    path: '/components-testing',
    name: 'components-testing',
    component: ComponentsTesting,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
