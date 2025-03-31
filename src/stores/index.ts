import { createPinia } from 'pinia'
import type { App } from 'vue'

// pinia presist
import piniaPluginPersist from 'pinia-plugin-persistedstate'

import { useUserStore } from '@/stores/user'

const registerStore = (app: App<Element>) => {
  app.use(createPinia().use(piniaPluginPersist))

  useUserStore().routeRefresh()
}

export default registerStore
