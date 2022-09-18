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

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

ASRequest.request<DataType>({
  url: '/home/multidata',
  showLoading: false
}).then((res) => {
  console.log(res.data)
  console.log(res.returnCode)
  console.log(res.success)
})
