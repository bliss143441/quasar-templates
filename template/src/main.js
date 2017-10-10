// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import './asyncData'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font/roboto-font.css')
}
import 'quasar-extras/material-icons/material-icons.css'
// import 'quasar-extras/ionicons/ionicons.css'
// import 'quasar-extras/fontawesome/fontawesome.css'
// import 'quasar-extras/animate/animate.css'

const app = new Vue({
  router,
  render: h => h(require('./App').default)
})

if (Vue.prototype.$isServer) {
  app.$mount('#q-app')
}
else {
  Quasar.start(() => {
    /* eslint-disable no-new */
    router.onReady(() => {
      app.$mount('#q-app')
    })
  })
}

export default {
  router,
  app
}
