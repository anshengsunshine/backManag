import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/index'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
