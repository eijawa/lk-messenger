import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const ComponentsTestingView = () => import('@/views/ComponentsTestingView.vue');
const AuthView = () => import('@/views/AuthView.vue');

const MessengerLayout = () => import('@/layout/MessengerLayout.vue');

const SidebarView = () => import('@/views/messenger/SidebarView.vue');
const ChatView = () => import('@/views/messenger/chat/ChatView.vue');
const MoreInfoView = () => import('@/views/messenger/chat/MoreInfoView.vue');
const SettingsView = () => import('@/views/messenger/settings/SettingsView.vue');
const LanguageView = () => import('@/views/messenger/settings/views/LanguageView.vue');

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
