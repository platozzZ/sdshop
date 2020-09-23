<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>

		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div>
		<div v-else>
			<ul class='setup-ul'>
				<li @tap="_uni_navigateTo('changePhone')">
					<text>{{bindPhone}}</text>
					<image class='arrow' :src="jiantou" />
				</li>
				<li v-if='havePass1 && !lktauthflag' @tap="_uni_navigateTo('loginPassword')">
					<text>修改登录密码</text>
					<image class='arrow' :src="jiantou" />
				</li>

				<li v-else-if="!lktauthflag" @tap="_uni_navigateTo('loginPassword')">
					<text>设置登录密码</text>
					<image class='arrow' :src="jiantou" />
				</li>

				<li v-if='havePass&&showSetPayPswdFlag' @tap="laikeNavigateTo('changePaypswd','paymentPassword')">
					<text>修改支付密码</text>
					<image class='arrow' :src="jiantou" />
				</li>
				<li v-else-if="!havePass&&showSetPayPswdFlag" @tap="laikeNavigateTo('setPaypswd','payment')">
					<text>设置支付密码</text>
					<image class='arrow' :src="jiantou" />
				</li>
				
				<!-- #ifdef MP -->
				<li v-if="lktauthflag" @tap="quit">
					<text>使用账号登录</text>
					<image class='arrow' :src="jiantou" />
				</li>
				<!-- #endif -->
				
				
			</ul>
			<div class='button margin' v-if="!lktauthflag" @tap="quit">退出登录</div>
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		removeStorage,
		getStorage
	} from '../../common/storage.js'

	export default {
		data() {
			return {
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				title: '设置',
				name: '',
				id: '',
				user_id: '', // 授权id
				size: "",
				number_s: "",
				havePass: false,
				havePass1: false,
				lktauthflag: false, // 是否为授权登录
				bindPhone: '修改手机号',
				showSetPayPswdFlag: true, // 显示修改支付密码和设置密码

				load: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/loading.gif'
			}
		},
		mounted() {
			this.load = true
			let me = this;
			
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me._axios();
					
					let needRegister = uni.getStorageSync("needRegister");
					let LoingByHand = uni.getStorageSync("LoingByHand");
					
					me.lktauthflag = (!LoingByHand && needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
					if (me.lktauthflag) {
						me.bindPhone = "绑定手机号";
					}
				});
			});
		},
		onLoad(option) {

		},
		methods: {
			...mapMutations({
				access_id: 'SET_ACCESS_ID'
			}),
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				let needRegister = uni.getStorageSync("needRegister");
				let LoingByHand = uni.getStorageSync("LoingByHand");
				me.access_id = me.$store.state.access_id;
				me.lktauthflag = (!LoingByHand && needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
				if (me.lktauthflag) {
					me.bindPhone = "绑定手机号";
				}
				me._axios();
			},
			/**
			 * 
			 * */
			laikeNavigateTo(type, url) {
				var me = this;
				let needRegister = uni.getStorageSync("needRegister");
				let LoingByHand = uni.getStorageSync("LoingByHand");
				me.lktauthflag = (!LoingByHand && needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
				let phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : me.$store.state.user_phone
				if (me.lktauthflag && !phone) {
					uni.showToast({
						title: "您未绑定手机号码，请先绑定手机号.",
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url: url + '?havePass=' + this.havePass1
				})
			},
			/**
			 * 
			 * */
			_axios() {
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'user',
					app: 'set'
				}
				var me = this

				this.$req.post({
					data
				}).then(res => {

					let needRegister = uni.getStorageSync("needRegister");
					let LoingByHand = uni.getStorageSync("LoingByHand");
					
					if (res.code == 200) {
						
						if (res.password_status == 1) {
							me.havePass = true
						} else if (res.password_status == 0) {
							me.havePass = false
						}
						if (res.mima_status == 1) {
							me.havePass1 = true
						} else if (res.mima_status == 0) {
							me.havePass1 = false
						}
						
						me.lktauthflag = (!LoingByHand && needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
						me.load = false
						
					}
				})
			},
			/**
			 * 
			 * */
			_uni_navigateTo(url) {
				uni.navigateTo({
					url: url + '?havePass=' + this.havePass1
				})
			},
			/**
			 * 
			 * */
			quit() {

				uni.removeStorage({
					key: 'history'
				})

				uni.removeStorage({
					key: 'user_phone'
				})

				uni.removeStorage({
					key: 'hotStatu'
				})

				this.$store.state.cart = []
				this.$store.state.cart_id = []
				this.$store.state.nCart = []
				this.$store.state.shouquan = false

				// #ifdef MP
				uni.removeStorageSync("userinfo");
				uni.removeStorageSync("laiketuiAccessId");
				// #endif
				
				uni.removeStorageSync("online");	
				uni.removeStorageSync("LoingByHand");

				uni.removeStorageSync("tripartiteChannel");
				uni.removeStorageSync("tripartitePhone");

				let data = {
					module: 'app',
					action: 'login',
					app: 'quit',
					access_id: this.access_id
				}

				this.$req.post({
					data
				}).then(res => {

					this.$store.state.access_id = ''

					uni.removeStorage({
						key: 'access_id'
					})

					uni.navigateTo({
						url: '../../pages/login/login?toHome=true&quit=true'
					})

				})

			},
		},
		computed: {
			halfWidth() {
				var gru = this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		components: {
			Heads
		}
	}
</script>

<style lang="less" scoped>
	/* @import url("../../static/css/setUp/setUp.css"); */
	@import url("../../static/css/setUp/setUp.less");
</style>
