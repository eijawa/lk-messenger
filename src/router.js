import { createWebHistory, createRouter } from 'vue-router'

import MessengerView from './views/MessengerView.vue'
import ConversationInDepth from './views/ConversationInDepth.vue'

const routes = [
    {
        path: '/',
        name: 'MessengerView',
        component: MessengerView,
        children: [
            {
                name: 'Chat',
                path: 'convs/:id',
                component: ConversationInDepth
            }
        ]
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
