import { createApp } from 'vue'
import router from './router'
import store from './store/store'

import App from './App.vue'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import { library as FontAwesomeLibraryCore } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// TODO: Dynamic import from array of dict

import { faBars, faCircleCheck, faFile, faFileImage, faFilePdf, faFileWord, faFilePowerpoint, faFileExcel, faFileZipper, faFileLines, faArrowLeft, faMagnifyingGlass, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
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
.use(PerfectScrollbar)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(store)
.mount('#app')
