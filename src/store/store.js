import { createStore } from 'vuex'
import chatsModule from './chats.module';
import messengerLayoutModule from './messengerLayout.module';

// Create a new store instance.
export default createStore({
  modules: {
    chatsModule: chatsModule,
    messengerLayoutModule: messengerLayoutModule,
  }
});