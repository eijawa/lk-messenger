import { createApp } from 'vue';
import { createPinia } from 'pinia';


import { library as FontAwesomeLibraryCore } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// TODO: Dynamic import from array of dict

import { faBars, faCircleCheck, faFile, faFileImage, faFilePdf, faFileWord, faFilePowerpoint, faFileExcel, faFileZipper, faFileLines, faArrowLeft, faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './routes/router';
// import {  } from '@fortawesome/free-regular-svg-icons'

// Used in Sidebar Header
FontAwesomeLibraryCore.add([faBars]);

// Used in Chats and Messages
FontAwesomeLibraryCore.add([faCircleCheck]);

// Used in Chats and Messages for attachments
FontAwesomeLibraryCore.add([faFile, faFileImage, faFilePdf, faFileWord, faFilePowerpoint, faFileExcel, faFileZipper, faFileLines]);

// Used in Chat Header
FontAwesomeLibraryCore.add([faArrowLeft, faMagnifyingGlass, faEllipsisVertical]);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(createPinia())
.mount('#app');
