// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import MintUI from 'mint-ui'
import { syncConfig,configGet} from './lib/api'
import 'mint-ui/lib/style.css'
import './assets/style/style.css'
import  './assets/css/reset.less'
import { Range } from 'mint-ui';
import  'animate.css'

Vue.use(MintUI)

Vue.component(Range.name,Range)

Vue.config.productionTip = false

Vue.prototype.$syncConfig = syncConfig;
Vue.prototype.$configGet = configGet;

window.syncConfig = syncConfig;
window.configGet = configGet;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  created(){
    this.$store.commit('init')
  },
  components: { App },
  template: '<App/>'
})
