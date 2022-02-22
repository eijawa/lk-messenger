import { createStore } from 'vuex'
import conversationsModule from './conversations.module';

// Create a new store instance.
export default createStore({
  modules: {
    conversationsModule: conversationsModule,
  }
});