import '../src/style/reset.css'
import '../src/style/font.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import 'amfe-flexible'
import '@/utils/flexible.js'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import '@/utils/Messages.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
