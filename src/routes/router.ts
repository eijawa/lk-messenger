import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import ComponentsTestingView from '@/views/ComponentsTestingView.vue';
import AuthView from '@/views/AuthView.vue';

import MessengerLayout from '@/layout/MessengerLayout.vue';
import SidebarView from '@/views/leftColumn/SidebarView.vue';
import ChatView from '@/views/middleColumn/ChatView.vue';
import SettingsView from '@/views/leftColumn/settings/SettingsView.vue';
import LanguageView from '@/views/leftColumn/settings/views/LanguageView.vue';

export const routesMobile: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MessengerView',
    component: MessengerLayout,
    redirect: '/messenger',
    children: [
      {
        path: 'messenger',
        name: 'messenger',
        component: SidebarView,
        children: [
          {
            path: 'chat',
            name: 'chat',
            component: ChatView,
          },
          {
            path: 'settings',
            name: 'settings',
            component: SettingsView,
            children: [
              {
                path: 'lang',
                name: 'lang',
                component: LanguageView,
              },
            ],
          },
        ],
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
    component: ComponentsTestingView,
  },
];

export const routesDesktop: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MessengerLayout',
    component: MessengerLayout,
    redirect: '/messenger',
    children: [
      {
        path: 'messenger',
        name: 'messenger',
        component: SidebarView,
        children: [
          {
            path: 'chat/:id',
            name: 'chat',
            components: {
              default: SidebarView,
              middle: ChatView,
            },
          },
          {
            path: 'settings',
            name: 'settings',
            component: SettingsView,
            children: [
              {
                path: 'lang',
                name: 'lang',
                component: LanguageView,
              },
            ],
          },
        ],
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
    component: ComponentsTestingView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesDesktop,
});

export default router;
