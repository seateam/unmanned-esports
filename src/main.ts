import { createApp } from 'vue'
import App from '@/app.vue'
// pwa
// import '@/modules/register-service-worker'
import router from '@/modules/router'
import pinia from '@/stores/pinia'
import VueI18n from '@/modules/i18n'
import VueGtag from 'vue-gtag-next'
// main style
import '@/main.scss'

createApp(App)
  .use(pinia)
  .use(router)
  .use(VueI18n)
  .use(VueGtag, {
    property: { id: process.env.VUE_APP_UNIPASS_GA },
  })
  .mount('#app')
