import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import ComponentsTestingView from '@/views/ComponentsTestingView.vue';
import AuthView from '@/views/AuthView.vue';

import MessengerLayout from '@/layout/MessengerLayout.vue';

import SidebarView from '@/views/messenger/SidebarView.vue';
import ChatView from '@/views/messenger/chat/ChatView.vue';
import MoreInfoView from '@/views/messenger/chat/MoreInfoView.vue';
import SettingsView from '@/views/messenger/settings/SettingsView.vue';
import LanguageView from '@/views/messenger/settings/views/LanguageView.vue';

export const routes: RouteRecordRaw[] = [
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
            component: ChatView,
            children: [
              {
                path: 'info',
                name: 'chatInfo',
                component: MoreInfoView,
              },
            ],
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
  routes,
});

export default router;
