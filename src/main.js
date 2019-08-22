import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import vClickOutside from 'v-click-outside'
import App from './App.vue'
import loader from './components/loader.js'
import vueHeadful from 'vue-headful';
import router from './helpers/router.js'
import functions from './helpers/functions.js'
import ApiService from './helpers/api.service'
import axios from 'axios'

import store from "./store"

// Регистрация по всему приложению
Vue.prototype.$http = axios

ApiService.init();

functions.bindDirectives();

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(vClickOutside)

// Автозагрузчик компонентов
const components = loader.load(Vue);

Vue.component('vue-headful', vueHeadful);

new Vue({
	store,
	router:  new VueRouter({
		routes: router.getRoutes(components)
	}),
	el: '#app',
	render: h => h(App)
})