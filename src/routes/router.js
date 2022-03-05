import { createWebHistory, createRouter } from 'vue-router';

import MessengerView from '@/views/MessengerView.vue';
import ChatInDepth from '@/views/ChatInDepth.vue';
import AuthView from '@/views/AuthView.vue';
import ComponentsTesting from '@/views/ComponentsTestingView.vue';

const routes = [
  {
    path: '/',
    name: 'MessengerView',
    component: MessengerView,
    children: [
      {
        name: 'chats',
        path: 'chats/:id',
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
  {
    path: '/components-testing',
    name: 'components-testing',
    component: ComponentsTesting,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
