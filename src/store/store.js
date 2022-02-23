import { createStore } from 'vuex'
import conversationsModule from './conversations.module';
import messengerLayoutModule from './messengerLayout.module';

// Create a new store instance.
export default createStore({
  modules: {
    conversationsModule: conversationsModule,
    messengerLayoutModule: messengerLayoutModule,
  }
});