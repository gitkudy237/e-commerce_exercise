import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Create Vue application
const app = createApp(App)

// Use plugins
app.use(store)
app.use(router)

// Mount the app
app.mount('#app')