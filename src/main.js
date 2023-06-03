import './assets/main.css'
import {createApp} from 'vue';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Popper from "vue3-popper";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fas, far)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon, Popper)
.use(router, VueAxios, axios)
.mount('#app')
