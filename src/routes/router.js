import { createWebHistory, createRouter } from 'vue-router';
import AuthView from '../views/AuthView.vue';

import MessengerView from '../views/MessengerView.vue';
import ChatInDepth from '../views/ChatInDepth.vue';

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
        path: '/auth/:jwt',
        name: 'auth',
        component: AuthView,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
