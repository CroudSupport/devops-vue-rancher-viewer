// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import CroudSemantic from 'croud-vue-semantic'
import axios from 'axios'
import 'croud-style-guide/semantic/dist/semantic.min'
import 'croud-style-guide/semantic/dist/semantic.min.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(CroudSemantic)

Vue.prototype.$http = axios
Vue.http = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})
