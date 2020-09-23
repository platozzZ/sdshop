<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<toload :load="load">
			<ul class='setup-ul yh-setup-ul'>

				<li>
					<input type="number" v-model="user_phone" disabled="true">
				</li>

				<li class='last'>
					<input placeholder-style="color: #b8b8b8;" class='input' :class='{marginleft:display}' type="number" placeholder="请输入手机验证码"
					 v-model="codeone">

					<div class='color yh-color' v-if='display' @tap="_verif()">获取验证码</div>

					<div class='active yh-color' v-if='!display'>
						<span ref='time' class="yh-time">{{count}}S</span>
						后再次获取
					</div>
				</li>

				<li>
					<input placeholder-style="color: #b8b8b8;" class='input yh-input' type="number" size='6' placeholder="请输入6位数的新密码"
					 v-model="newpassword">
					<img :src="del" v-show="newpassword.length" @tap="_empty(1)" />
				</li>

				<li class='set_l'>
					<input placeholder-style="color: #b8b8b8;" class='input yh-input' type="number" size='6' placeholder="请确认新密码"
					 v-model="againpassword">
					<img :src="del" v-show="againpassword.length" @tap="_empty(2)">
				</li>

				<li id='setupButtomWrap' class="yh-setupButtomWrap">
					<div class='setup-buttom yh-setup-buttom' @tap="_sub">确认</div>
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
				del: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/delete2x.png',
				load: false,
				title: '修改支付密码',
				oldpassword: '',
				input_oldpassword: '',
				newpassword: '',
				againpassword: '',
				access_id: '',
				codeone: '', // 验证码
				user_phone: '',
				count: '',
				display: true,
				rez: '', // 新密码是否满足正则匹配
				timer: null,
				fastTap: true,
			}
		},
		created() {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : me.$store.state.user_phone
					me.load = true
					// #ifdef MP-WEIXIN
					if (!me.user_phone) {
						uni.showToast({
							title: "请先绑定手机号码！",
							duration: 1000,
							icon: 'none'
						});
						uni.navigateTo({
							url: "changePhone"
						})
						return;
					}
					// #endif

				});
			});
		},
		components: {
			Heads,
			toload
		},
		watch: {
			/**
			 * 
			 * */
			newpassword(newValue, oldValue) {
				this.$nextTick(function() {
					if (newValue.toString().length > 6) {
						this.newpassword = oldValue
					}
				})
			},
			/**
			 * 
			 * */
			againpassword(newValue, oldValue) {
				this.$nextTick(function() {
					if (newValue.toString().length > 6) {
						this.againpassword = oldValue
					}
				})
			},
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
					message_type1: 5 // 短信类别 5.修改支付密码
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
							console.log(TIME_F, count_f)
							let timer_f = setInterval(() => {
								if (count_f > 0 && count_f <= TIME_F) {
									count_f--
									console.log(count_f)
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
			 * 
			 * */
			_empty(type) {
				if (type == 0) {
					this.input_oldpassword = ''
				} else if (type == 1) {
					this.newpassword = ''
				} else if (type == 2) {
					this.againpassword = ''
				}
			},
			/**
			 * 
			 * */
			_newpassword() {
				var re = /^\d{6}$/;
				if (this.newpassword != '') {
					this.rez = re.test(this.newpassword);
					if (this.rez == true) {
						return
					} else {
						this.newpassword = ''
						uni.showToast({
							title: "请输入6位数字密码",
							duration: 1000,
							icon: 'none'
						})
					}
				}
			},
			/**
			 * 
			 * */
			_againpassword() {
				if (this.againpassword != '') {
					if (this.newpassword == this.againpassword) {
						return
					} else {
						uni.showToast({
							title: "两次密码输入不一致！",
							duration: 1000,
							icon: 'none'
						})
					}
				}

			},
			/**
			 * 
			 * */
			_sub() {
				var re = /^\d{6}$/;
				if (this.newpassword != '') {
					this.rez = re.test(this.newpassword);
				}

				var me = this


				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				if (this.newpassword == '' || this.againpassword == '' || this.codeone.length != 6) {
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
						title: "请输入6位数新密码",
						duration: 1000,
						icon: 'none',
						success: function(res) {
							me.fastTap = true
						}
					})
				} else if (this.againpassword != '' && this.newpassword != this.againpassword) {
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
				} else if (this.newpassword != '' && this.newpassword == this.againpassword && this.codeone.length == 6) {
					//发送请求
					var data = {
						module: 'app',
						action: 'user',
						app: 'modify_payment_password',
						access_id: this.access_id,
						x_password: this.newpassword,
						phoneNum: this.user_phone,
						keyCode: this.codeone
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
									duration: 1500,
									icon: 'none',
									success: function(res) {
										me.fastTap = true
									}
								})
								setTimeout(function() {
									uni.navigateBack({
										url: '../../pagesB/setUp/setUp'
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
	@import url("../../static/css/setUp/paymentPassword.css");
</style>
