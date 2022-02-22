import { createApp } from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

createApp(App)
.use(PerfectScrollbar)
.use(router)
.use(store)
.mount('#app')
