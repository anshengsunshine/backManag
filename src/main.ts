import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/index'
import ASRequest from './api'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
