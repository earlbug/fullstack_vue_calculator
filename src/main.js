import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { upperFirst, camelCase } from 'lodash'

import App from './App.vue'
import router from './router'


const app = createApp(App)

// Vite-compatible automatic component registration
const components = import.meta.glob('./components/Base*.{vue,js}', { eager: true })

Object.keys(components).forEach(filePath => {
  const componentConfig = components[filePath]
  const fileName = filePath.replace('./components/', '')
  const componentName = upperFirst(
    camelCase(fileName.replace(/\.\w+$/, ''))
  )
  app.component(componentName, componentConfig.default || componentConfig)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
