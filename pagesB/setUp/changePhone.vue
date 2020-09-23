<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		
		<toload :load="load">
			<ul class='setup-ul yh-setup-ul'>
				<li>
					<input placeholder-style="color: #b8b8b8;" type="number" placeholder="请输入有效的手机号码" v-model="newphone" @input="_changeStep">
				</li>

				<li class='last'>

					<input placeholder-style="color: #b8b8b8;" class='input' type="number" placeholder="请输入手机验证码" v-model="codeone"
					 @input="_changeStep">

					<div class='color yh-color' style='' v-if='display' @tap='_verif'>获取验证码</div>

					<div class='active yh-color' v-if='!display'>
						<span ref='time' class="yh-time">{{count}}S</span>后再次获取
					</div>

				</li>

				<li id='setupButtomWrap' class="yh-setupButtomWrap">
					<div class='setup-buttom yh-isSure' :class={sure:isSure} @tap="_sub">确认</div>
				</li>

			</ul>
		</toload>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	
	import {
		telephone
	} from '../../common/landing.js'
	import {
		getStorage
	} from '../../common/storage.js'

	export default {
		data() {
			return {
				title: '修改手机号码',
				display: true,
				count: '',
				timer: null,
				code: "",
				newphone: '',
				passtwo: '',
				codeone: '', // 验证码
				oldphone: '', // 旧手机号
				phone_next: '', // 新手机号码输入正确返回值
				access_id: '',
				fastTap: true,
				isSure: false,
				load: false
			}
		},
		mounted() {
			let me = this;
			setTimeout(function(){
				console.log("=====>");
				console.log(me.$refs);
				if(me.$refs.lktAuthorizeComp){
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
						me.oldphone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : me.$store.state.user_phone
						me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
						me.load = true
					})
				}
			},100);
		},
		onLoad(option) {

			let me = this;

			let needRegister = uni.getStorageSync("needRegister");
			let LoingByHand = uni.getStorageSync("LoingByHand");

			let authFlag = (!LoingByHand && needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);

			if (authFlag) {
				me.title = "绑定手机号";
				//#ifdef MP-WEIXIN
				uni.setNavigationBarTitle({
					title: me.title
				});
				// #endif
			}
			
			

		},
		methods: {
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
			},
			/**
			 * 
			 * */
			_changeStep(e) {
				if (e.detail.value.length == 11 && this.codeone.length == 6) {

					this.isSure = true;
				} else if (e.detail.value.length == 6 && this.newphone.length == 11) {

					this.isSure = true;
				} else {
					this.isSure = false;
				}

			},
			/**
			 * 手机号码验证
			 * */
			_telephone() {
				if (this.oldphone != this.newphone) {
					this.phone_next = telephone(this.newphone)
				} else {
					uni.showToast({
						title: "新号码与旧号码一致！",
						duration: 1000,
						icon: 'none'
					})
				}
			},
			/**
			 * 验证码发送1分钟倒计时
			 * */
			_verif() {

				if (!this.fastTap) {
					return
				}
				
				this.fastTap = false
				
				var me = this;
				var data = {
					module: 'app',
					action: 'user',
					app: 'secret_key',
					phone: this.newphone,
					message_type: 0, // 短信类型 0.验证码 1.短信通知
					message_type1: 3 // 短信类别 3.修改手机号
				}

				if (this.newphone) {
					
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							
							me.fastTap = true
							let {
								data: {
									code,
									message
								}
							} = res
							if (code != 200) {
								uni.showToast({
									title: message,
									duration: 1000,
									icon: 'none'
								})
							} else if (code == 200) {
								me._time()
								// me.code = verification
								const TIME_F = 300
								let count_f = TIME_F
								console.log(TIME_F, count_f)
								let timer_f = setInterval(() => {
									if (count_f > 0 && count_f <= TIME_F) {
										count_f--
									} else {
										clearInterval(timer_f);
										timer_f = null
										me.code = ''
									}
								}, 1000)
							}
							console.log(res)
						},
						error: function(err) {
							console.log(err)
							me.fastTap = true
						}
					})
				} else {
					this.fastTap = true
					uni.showToast({
						title: "未获取到正确的手机号码！",
						duration: 1000,
						icon: 'none'
					})
				}
			},
			/**
			 * 1分钟倒计时
			 * */
			_time() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.display = false;
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.display = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			/**
			 * 
			 * */
			_sub() {
				if (!this.fastTap) {
					return
				}
				this.fastTap = false;
				var me = this
				console.log(this.codeone, this.code, this.newphone, this.oldphone)
				if (this.codeone == '' || this.newphone == '') {
					uni.showToast({
						title: "请填写完整信息！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.codeone.length != 6) {
					uni.showToast({
						title: "验证码错误！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.oldphone != this.newphone) {
					this.fastTap = true
					this.phone_next = telephone(this.newphone)
				} else if (this.oldphone == this.newphone) {
					uni.showToast({
						title: "您输入的手机号码与原号码相同，请重新输入！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				}

				if (this.codeone.length == 6 && this.newphone != '' && this.oldphone != this.newphone && this.phone_next == 1) {
					//发送请求
					var data = {
						module: 'app',
						action: 'user',
						app: 'update_phone',
						access_id: this.access_id,
						y_phone: this.oldphone,
						x_phone: this.newphone,
						keyCode: this.codeone
					}
					console.log(data)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							me.fastTap = true
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {

								uni.showToast({
									title: "修改成功！",
									duration: 1000,
									icon: 'none'
								})

								// #ifndef MP
								setTimeout(function() {
									me.$store.state.access_id = ''
									uni.removeStorageSync('access_id')
									uni.removeStorageSync('user_phone')
									me.$store.state.user_phone = ''
									uni.reLaunch({
										url: '../../pages/login/login'
									});
								}, 1000);
								// #endif

								// #ifdef MP-WEIXIN
								uni.setStorageSync('user_phone', me.newphone);
								me.$store.state.user_phone = me.newphone;
								uni.switchTab({
									url: '../../pages/tabBar/my'
								})
								// #endif
							} else {
								uni.showToast({
									title: message,
									duration: 1000,
									icon: 'none'
								})
							}
						},
						error: function(err) {
							console.log(err)
							me.fastTap = true
						},
					})
				} else {
					this.fastTap = true
				}
				console.log(this.phone_next)
			}
		},
		components: {
			Heads,
			toload
		}
	}
</script>

<style scoped>
	@import url("../../static/css/setUp/changePhone.css");
</style>
