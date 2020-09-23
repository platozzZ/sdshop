<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<heads v-if="status" :title='title'></heads>
		<heads v-else :title='title1'></heads>
		<toload :load="load">
			<ul class='setup-ul yh-setup-ul'>

				<li>
					<input type="number" disabled="true" v-model="user_phone" readonly>
				</li>

				<li class='last'>
					<input placeholder-style="color:#b8b8b8" class='input' type="number" placeholder="请输入手机验证码" v-model="codeone">

					<div class='color yh-color' v-if='display' @tap="_verif">获取验证码</div>

					<div class='active yh-color' v-if='!display'>
						<span ref='time' class="yh-time">{{count}}S</span>
						后再次获取
					</div>

				</li>

				<li>
					<input placeholder-style="color:#b8b8b8" type="password" placeholder="请输入6-16位数的新密码" v-model="passone">
				</li>

				<li>
					<input placeholder-style="color:#b8b8b8" type="password" placeholder="请确认新密码" v-model="passtwo">
				</li>

				<li id='setupButtomWrap' class="yh-setupButtomWrap">
					<div class='setup-buttom yh-setup-buttom' @tap="_sub">确认</div>

					<!-- #ifdef MP-WEIXIN -->
					<div v-if="isset" class='setup-buttom yh-isset' @tap="_back">返回至个人中心</div>
					<!-- #endif -->

				</li>

			</ul>
		</toload>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	import {
		getStorage
	} from '../../common/storage.js'

	export default {
		data() {
			return {
				load: false,
				title: '修改登录密码',
				title1: '设置登录密码',
				status: true,
				display: true,
				count: '',
				timer: null,
				code: "",
				name: '',
				passone: '',
				passtwo: '',
				codeone: '', // 验证码
				user_phone: '',
				access_id: '',
				rez: '', // 新密码是否满足正则匹配
				fastTap: true,
				// allok:false,
				isset: false,
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
			}
		},
		onLoad(res) {
			this.status = (res.havePass == "true")

			// #ifdef MP-WEIXIN
			var pages = getCurrentPages();
			var beforePage = pages[pages.length - 2];
			if (!beforePage) {
				this.isset = true
			}
			// #endif
		},
		created() {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : me.$store.state.user_phone
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					
					me.load = true
				});
			});
		},
		components: {
			Heads,
			toload
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
			_back() {
				uni.switchTab({
					url: '../../pages/tabBar/my'
				});
			},
			/**
			 * 验证码发送1分钟倒计时
			 * */
			_verif() {
				var me = this;
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				var data = {
					module: 'app',
					action: 'user',
					app: 'secret_key',
					phone: this.user_phone,
					message_type: 0, // 短信类型 0.验证码 1.短信通知
					message_type1: 4 // 短信类别 4.修改登录密码
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
							const TIME_F = 300
							let count_f = TIME_F
							// console.log(TIME_F,count_f)
							let timer_f = setInterval(() => {
								if (count_f > 0 && count_f <= TIME_F) {
									count_f--
									// console.log(count_f)
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
			},
			/**
			 * 判定验证码是否输入正确
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
			 * 第一次密码输入
			 * */
			_passone() {
				var re = /^[a-z0-9]{6,15}$/i;
				if (this.passone != '') {
					var rez = re.test(this.passone);
					if (rez == true) {
						this.allok = true
					} else {
						uni.showToast({
							title: "请输入6-15位数字或字母密码！",
							duration: 1000,
							icon: 'none'
						})
						this.allok = false
						return false
					}
				}
			},
			/**
			 * 确认密码
			 * */
			_passtwo() {
				if (this.passone != '' && this.passtwo != '') {
					if (this.passone == this.passtwo && this.passtwo != '') {
						this.allok = true
					} else {
						uni.showToast({
							title: "两次输入不一致！",
							duration: 1000,
							icon: 'none'
						})
						this.allok = false
						return false
					}
				}
			},
			/**
			 * 
			 * */
			_sub() {
				var re = /^[a-z0-9]{6,15}$/i;
				if (this.passone != '') {
					this.rez = re.test(this.passone)
				}
				var me = this
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				if (this.passone == '' || this.passtwo == '' || this.codeone.length != 6) {
					uni.showToast({
						title: "请填写正确信息！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (!this.rez) {
					uni.showToast({
						title: "请输入6-15位数字或字母密码！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.passtwo != '' && this.passone != this.passtwo) {
					uni.showToast({
						title: "两次密码输入不一致！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.codeone.length != 6) {
					uni.showToast({
						title: "请输入正确的验证码！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.passone != '' && this.passone == this.passtwo && this.codeone.length == 6) {
					// 发送请求
					if (this.status) {
						console.log('修改密码')
						var data = {
							module: 'app',
							action: 'user',
							app: 'updatepassword',
							access_id: this.access_id,
							password: this.passtwo,
							phone: this.user_phone,
							keyCode: this.codeone
						}
					} else {
						console.log('设置密码')
						var data = {
							module: 'app',
							action: 'user',
							app: 'set_password',
							access_id: this.access_id,
							password: this.passtwo,
							phone: this.user_phone,
							keyCode: this.codeone
						}
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							me.fastTap = true
							console.log('设置修改密码res')
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {
								uni.showToast({
									title: "设置成功！",
									duration: 1500,
									icon: 'none',
									success: function(res) {
										me.fastTap = true
									}
								})
								setTimeout(function() {
									uni.reLaunch({
										url: '../../pages/login/login'
									})
								}, 1500)
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
						}
					})
				} else {
					uni.showToast({
						title: "请填写正确信息！",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/setUp/loginPassword.css");
</style>
