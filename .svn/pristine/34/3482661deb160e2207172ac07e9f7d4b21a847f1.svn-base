import Vue from 'vue'
import App from './App'
import store from './store'
import laiketuiComm from './components/laiketuiCommon.vue'
import laiketuiWeixinAuth from './components/laiketuiauth/mpweixin/mpweixin.vue'
import laiketuiAlipayAuth from './components/laiketuiauth/mpalipay/mpali.vue'
import laiketuiTTAuth from './components/laiketuiauth/mptt/mptt.vue'
import laiketuiBDAuth from './components/laiketuiauth/mpbaidu/mpbaidu.vue'

import lktauthorize from './components/lktauthorize.vue'
import laikepay from './components/laikepay.vue'

import req from '@/common/req/main.js'

import loginFrom from './common/login.js'
Vue.prototype.$loginFrom = loginFrom

import backApp from './common/backApp.js'
Vue.prototype.$backApp = backApp

//#ifdef H5
import Bridge from './common/JSbridge.js'
Vue.prototype.$bridge = Bridge
// #endif

// #ifdef H5
var jweixin = require('jweixin-module')
Vue.prototype.$jweixin = jweixin
import { jssdk_share } from '@/common/util.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// #endif

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
Vue.prototype.LaiKeTuiCommon = laiketuiComm;
Vue.prototype.laikepay = laikepay;
Vue.prototype.LaiketuiWeixinAuth = laiketuiWeixinAuth;
Vue.component('lktauthorize', lktauthorize);
Vue.prototype.LaiketuiAliAuth = laiketuiAlipayAuth;
Vue.prototype.LaiketuiTTAuth = laiketuiTTAuth;
Vue.prototype.LaiketuiBDAuth = laiketuiBDAuth;

Vue.mixin({
	onLoad: function (option) {
		// #ifdef H5
		jssdk_share(this, option)
		// #endif
	}
})

const app = new Vue({
	...App,
	store
});
app.$mount()
window.app = app;