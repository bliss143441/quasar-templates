import Vue from 'vue'
import VueRouter from 'vue-router'
import { Platform } from 'quasar'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  
  // Here we must manually determine the mode because we are mocking the window object on the server and it misses up vue-routers internal platform detection
  mode: Platform.is.cordova ? 'hash' : 'history',
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('Hello') },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
