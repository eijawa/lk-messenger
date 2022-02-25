import { createWebHistory, createRouter } from 'vue-router';

import MessengerView from '@/views/MessengerView.vue';
import ChatInDepth from '@/views/ChatInDepth.vue';
import AuthView from '@/views/AuthView.vue';

const routes = [
  {
    path: '/',
    name: 'MessengerView',
    component: MessengerView,
    children: [
      {
        name: 'Chat',
        path: 'convs/:id',
        component: ChatInDepth,
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    props: route => ({ query: route.query.jwt }),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
