import './assets/GoogleMaterial.css'
// import 'material-design-icons/iconfont/material-icons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    components: {
        FontAwesomeIcon
    },
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
