import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MessengerLayout',
    component: () => import('@/layout/MessengerLayout.vue'),
    redirect: '/messenger',
    children: [
      {
        path: 'messenger',
        name: 'messenger',
        component: () => import('@/views/messenger/SidebarView.vue'),
        children: [
          {
            path: 'chat/:id',
            name: 'chat',
            component: () => import('@/views/messenger/chat/ChatView.vue'),
            children: [
              {
                path: 'info',
                name: 'chatInfo',
                component: () => import('@/views/messenger/chat/MoreInfoView.vue'),
              },
            ],
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('@/views/messenger/settings/SettingsView.vue'),
            children: [
              {
                path: 'lang',
                name: 'lang',
                component: () => import('@/views/messenger/settings/views/LanguageView.vue'),
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
    component: () => import('@/views/AuthView.vue'),
    props: route => ({ query: route.query.jwt }),
  },
  {
    path: '/components-testing',
    name: 'components-testing',
    component: () => import('@/views/ComponentsTestingView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
