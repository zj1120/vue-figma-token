import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式统一化
import 'normalize.css'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 引入tailwind
import './assets/tailwind.css'
import 'truelore-public/src/assets/css/reset.css'

// Vue语法补丁
import VueCompositionApi from '@vue/composition-api'
import hooks from '@u3u/vue-hooks';

Vue.use(hooks);
Vue.use(VueCompositionApi)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
