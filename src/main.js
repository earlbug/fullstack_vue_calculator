import { createApp } from 'vue'
import { createPinia } from 'pinia'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import App from './App.vue'
import router from './router'

const app = createApp(App)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const compnentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  app.component(componentName, componentConfig.default || componentConfig)
});

app.use(createPinia())
app.use(router)

app.mount('#app')
