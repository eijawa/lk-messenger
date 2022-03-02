import { createApp } from 'vue';
import { createPinia } from 'pinia';


import { library as FontAwesomeLibraryCore } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// TODO: Dynamic import from array of dict

import { faBars, faUserGroup, faGraduationCap, faFile, faFileImage, faFilePdf,
  faFileWord, faFilePowerpoint, faFileExcel, faFileZipper, faFileLines,
  faArrowLeft, faMagnifyingGlass, faEllipsisVertical, faPaperclip,
  faPaperPlane, faPen, faUser, faUsers, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



import App from './App.vue';
import router from './routes/router';


// Used in Sidebar Header
FontAwesomeLibraryCore.add([faBars, faChevronLeft]);

// Used in Chats and Messages
FontAwesomeLibraryCore.add([faUserGroup, faGraduationCap]);

// Used in NewChatBtn
FontAwesomeLibraryCore.add([faPen, faUser, faUsers]);

// Used in Chats and Messages for attachments
FontAwesomeLibraryCore.add([faFile, faFileImage, faFilePdf, faFileWord, faFilePowerpoint, faFileExcel, faFileZipper, faFileLines]);

// Used in Chat Header
FontAwesomeLibraryCore.add([faArrowLeft, faMagnifyingGlass, faEllipsisVertical]);

// Used in Chat Footer
FontAwesomeLibraryCore.add([faPaperclip, faPaperPlane]);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount('#app');
