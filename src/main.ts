import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './routes/router';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app');
