import Vue from 'vue'
import Vuetify from 'vuetify'
import VueLodash from 'vue-lodash'
import store from '~/store'
import router from '~/router'
import { i18n } from '~/plugins'
import App from '~/components/App'
import '~/components'

const options = { name: 'lodash' }

Vue.use(Vuetify)
Vue.use(VueLodash, options)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  ...App
})
