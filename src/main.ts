import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 引入样式
import 'normalize.css'
import '@/assets/css/index.less'

// UnoCSS
import 'virtual:uno.css'

// Element-plus css
import 'element-plus/dist/index.css'

// Element-plus icons
import registerIcons from '@/global/register-icons'

// locale
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// pinia
import store from '@/stores'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(registerIcons)
app.use(store)
app.use(router)

app.mount('#app')
