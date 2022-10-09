import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { setupStore } from "./store"
import "./api/index"
import { globalRegister } from "./global"

import "normalize.css"
import "./assets/css/index.less"

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
// path: /user => user
app.use(router)
app.mount("#app")
