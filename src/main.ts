import './assets/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/resources/i18n'
// @ts-ignore
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify() 

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(i18n)
app.use(vuetify);
app.use(FlagIcon)
app.mount('#app')
