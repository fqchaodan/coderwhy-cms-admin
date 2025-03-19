import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入样式
import 'normalize.css'
import '@/assets/css/index.less'

// UnoCSS
import 'virtual:uno.css'

// Element-plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
