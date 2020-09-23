<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:13:00
 * @LastEditTime: 2019-09-06 09:26:57
 * @LastEditors: Please set LastEditors
 -->
<template>
	<!-- 渠道号是cmmc的注册页显示空白 -->
	<div v-if="!isCMMC">
		<div style='display: flex;flex-direction: column;min-height: 100vh;'>
		<div class = "content">
			<!--登录页面-->
			<div class="data_h " :style="{height: halfWidth}">
				<div class="data_h_h" :style="{height: halfWidth}"></div>
			</div>
			
			<div :style="{position:'relative',top:baiduHeadTop + 'px'}">

				<div class="head">
					<img class='head_close' :src="guanbi" @tap="_banck" />
					<div @tap="_register_q()">
						注册
					</div>
				</div>

				<!--密码登录-->
				<div class='login' v-if="landing">
					<div class='loginType'>
						密码登录{{tripartiteChannel}}
					</div>

					<div class='login_inpu'>
						<input type="text" :placeholder="passLoginCodePH" v-model='account' placeholder-style="color:#b8b8b8" @blur="_noNull(1)" />
						<img :src="del" v-show="account.length && account_f" @tap="_empty(1)" />
					</div>

					<div class='login_inpu'>
						<input type="text" :password="LoginPWStatus" :placeholder="passLoginPWPH" v-model='password' placeholder-style="color:#b8b8b8"
						@blur='_noNull(1)' />
						<img :src="LoginPWStatus?pwHide:pwShow" style='height: 32upx;width: 32upx;right: 20upx;bottom: 24upx;' @tap="pwStatus(1)" />
					</div>

					<p class='login_pass' v-if="landing"><span @tap='_navigateTo("retrievepassword")'>忘记密码？</span></p>
					<div class='button1' style='margin-top: 70upx;' v-if='pwLoginBtnStatus' @tap="_landing">登录</div>
					<div class='button1' v-else style='opacity: 0.4;margin-top: 70upx;'>登录</div>
					<div style='text-align: center;font-size: 28upx;color: #999999;'>或</div>
					<div class='button2' @tap="_phone">验证码登录</div>
				</div>

				<!--验证码登录-->
				<div class='login' v-if="!landing">

					<div class='loginType'>
						验证码登录
					</div>

					<div class='login_inpu'>
						<input type="number" :placeholder="codeLoginCodePH" v-model="phone" @focus="_pone_f" @blur="_telephone(phone,2)"
						placeholder-style="color:#b8b8b8" @input='_codeChangePhone' maxlength="11"/>
						<img :src="del" v-show="phone.length&&pone_f" @tap="_empty(3)" />
					</div>

					<div class='login_inpu' style='margin-bottom: 100upx;'>
						<input type="number" @focus='_codeF()' @blur='_codeB()' :placeholder="codeLoginPWPH" v-model="phone_code"
						placeholder-style="color:#b8b8b8" @input='_codeChangeCode' maxlength="6"/>
						<p class='login_p' style='z-index: 99;position: absolute;right: 24upx;' @tap="_phone_code(1)" :class="{color:60>count&&count>0||count===0}">{{time_code}}</p>
					</div>
					
					<div class='button1' style='margin-top: 70upx;' v-if='codeLoginBtnStatus' @tap="_landing">登录</div>
					<div class='button1' v-else style='opacity: 0.4;margin-top: 70upx;'>登录</div>
					<div style='text-align: center;font-size: 28upx;color: #999999;'>或</div>
					<div class='button2' @tap="_landing_passw">密码登录</div>
				</div>
			</div>
		</div>
			<div class='agreement' @tap="_navigateTo('agreement')" >注册/登录即代表已同意<span style="text-decoration:underline" >《{{agreement1}}》</span></div>
		</div>
	</div>
</template>

<script>
	import {
		telephone
	} from '../../common/landing.js'
	import {
		mapMutations
	} from 'vuex'
	import {
		setStorage,
		getStorage
	} from '../../common/storage.js'
	import {
		lkt_pwStatus,
		lkt_telephone,
		lkt_phone_code,
	} from '../../static/js/login/login.js'
	export default {
		data() {
			return {
				toHome: false,
				togoodsDetail:false,
				phone_codeStatus1: false,
				LoginPWStatus: true,
				pwLoginBtnStatus: false,
				codeLoginBtnStatus: false,
				fastTap: true,
				del: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/delete2x.png',
				guanbi: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				pwHide: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/pwHide.png',
				pwShow: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/pwShow.png',
				passLoginCodePH: '请输入账号/手机号',
				passLoginCodePH1: '请输入账号/手机号',
				passLoginPWPH: '请输入密码',
				passLoginPWPH1: '请输入密码',
				codeLoginCodePH: '请输入手机号',
				codeLoginCodePH1: '请输入手机号',
				codeLoginPWPH: '请输入验证码',
				codeLoginPWPH1: '请输入验证码',
				account: '', //登录账号
				password: '', //登录密码
				landing: true, //切换密码登录和手机号码登录
				phone: '', //验证码登录手机号
				phone_code: '', //验证码
				one_code: '', //手机号码格式正确返回值
				time_code: '获取验证码',
				timer: null,
				count: '', //倒计时时间
				old_phone: '', //存储获取验证码时的手机号码
				landing_code: '',
				passone: '',
				passtwo: '',
				account_f: '',
				pone_f: '',
				provider: '',
				agreement1: '',
				company: '',
				logo: '',
				src: false,
				fatherId:'',//父级id(分销商分享使用)
				baiduHeadTop:0,// 百度小程序头部兼容
				isCMMC: this.$store.state.channel == "cmmc",
				tripartiteChannel: this.$store.state.channel
				
			}
		},
		onLoad(option) {
			// 直接调用APP原生登录
			 // uni.getStorageSync("tripartiteChannel").toLowerCase()!="cmmc"
			// alert('this.$loginFrom.login')
				// this.$loginFrom.login(this,'');
			console.log(this.isCMMC);
			
			if(this.isCMMC){
				// uni.navigateTo({
				// 	url: "./register"
				// })
				this.$loginFrom.login(this);
				// alert('this.isCMMC：' + this.isCMMC)
				// setTimeout(function(){
				// },3000)
				return;
			}
			// #ifdef MP-BAIDU
			// 百度小程序头部兼容
			uni.getSystemInfo({
				success: (res) => {
					this.baiduHeadTop = res.navigationBarHeight
				}
			})
			// #endif
			
			let me = this
			uni.request({
				data: {
					module: 'app',
					action: 'login',
					app: 'index',
				},
				url:  uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					me.agreement1 = res.data.Agreement
					me.logo = res.data.logo
					me.company = res.data.company
				}
			})
			
			// 获取服务供应商
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					me.provider = res.provider
				}
			})
			
			if (option.landing_code) {
				this.togoodsDetail = option.landing_code
			}
			
			if(option.fatherId){
				this.fatherId = option.fatherId
			}
			
			if(!option.toHome) {

				this.toHome = false
			} else {
				this.toHome = true
			}
			
			if(uni.getStorageSync("fatherId")){
				this.fatherId = uni.getStorageSync("fatherId")
			}
			console.log('--------this.fatherId----------'+this.fatherId)
		},
		onShow() {
			let appLogin = uni.getStorageSync('appLogin')
			// alert('onshow:appLogin:'+ appLogin)
			console.log('onshow:appLogin:', appLogin);
			if(!appLogin) return
			uni.setStorageSync('appLogin', false)
			uni.navigateBack()
		},
		methods: {
			...mapMutations({
				access_id: 'SET_ACCESS_ID',
				user_phone: 'SET_USER_PHONE'
			}),
			// 返回
			_banck() {
				if (this.toHome) {
					uni.switchTab({
						url: '../tabBar/my'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			//to注册页面
			_register_q() {
				this.account = ''
				this.password = ''
				this.phone = ''
				this.phone_code = ''
				this.pwLoginBtnStatus = false
				this.codeLoginBtnStatus = false
				this.phone_codeStatus1 = false
				clearInterval(this.timer);
				this.time_code = '获取验证码'
				this.timer = null;
				this.count = ''
				
				if(this.fatherId){
					uni.navigateTo({
						url: '/pages/login/register?fatherId='+this.fatherId
					})
				}else{
					uni.navigateTo({
						url: '/pages/login/register'
					})
				}
				
			},
			//账号、密码输入框失焦 判断账号不为空
			_noNull(type) {
				var me = this;
				function in_noNull(){
					if (type == 1 && me.account && me) {
						me.passLoginCodePH = me.passLoginCodePH1;
						me.one_code = 1;
						me.account_f = true;
						me.pwLoginBtnStatus = true;
					} else {
						me.pwLoginBtnStatus = false;
					}
				}
				me.$nextTick(()=>{
					in_noNull();
				});
			},
			//叉，清空内容 1登录账号 3验证码登录手机号 245没用到
			_empty(val) {
				if (val == 1) {
					this.account = ''
					this.pwLoginBtnStatus = false
				} else if (val == 2) {
					this.password = ''
				} else if (val == 3) {
					this.phone = ''
				} else if (val == 4) {
					this.passone = ''
				} else if (val == 5) {
					this.passtwo = ''
				}
			},
			// 密码是否可见 1登录密码 2注册密码 3再次输入注册密码
			pwStatus(type) {
				lkt_pwStatus(type, this)
			},
			//登录
			_landing() {
				var me = this;
				if (this.landing) {
					if (!this.account || !this.password) {
						uni.showToast({
							title: '账号或密码不能为空',
							duration: 1000,
							icon: 'none'
						});
					} else if (this.account && this.password) {
						var data = {
							module: 'app',
							action: 'login',
							app: 'login',
							phone: this.account,
							password: this.password,
							access_id: this.$store.state.access_id,
							clientid:uni.getStorageSync("cid")
						}
						console.log('-------this.fatherId2----------'+this.fatherId)
						if(this.fatherId!=''){
							data.pid=this.fatherId//分销推荐人id
						}
						// #ifdef MP-WEIXIN
						data.store_type = 1
						// #endif
						// #ifndef MP-WEIXIN
						data.store_type = 2
						// #endif

						uni.request({
							data,
							url:  uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								let {
									data: {
										message,
										code,
										access_id,
										y_password,
										wx_status
									}
								} = res
								if (code == 200 && access_id) {
									me.$store.state.access_id = []
									
									uni.showToast({
										title: '登录成功！',
										duration: 1000,
										icon: 'none'
									})
									
									me.access_id(access_id)
									uni.setStorage({
										key: 'access_id',
										data: access_id,
										success: function() {

										}
									})
									
									//免注册登录下用账户或手机号登录
									uni.setStorageSync("LoingByHand",true);
									if (me.togoodsDetail) {
										
										if(getCurrentPages().length > 1){
											setTimeout(function() {
												uni.navigateBack({
													delta:1
												})
											}, 1000)
										} else {
											uni.switchTab({
												url:"../tabBar/my",
												success: function() {}
											})
										}

										
										
										
									} else {
										
										setTimeout(function() {
											
											console.log(me.fatherId)
											
											if(me.fatherId != '' && me.fatherId != undefined && me.fatherId != 'undefined'){
												
												uni.navigateTo({
													url: '../../pagesA/distribution/distribution_center',
													success: function() {
														if (wx_status != 1) {
															me.$store.state.shouquan = true
														}
													}
												})
												
											}else{
												uni.switchTab({
													url:"../tabBar/my",
													success: function() {
														if (wx_status != 1) {
															me.$store.state.shouquan = true
														}
													}
												})
											}
										}, 1000)
									}
								} else {
									uni.showToast({
										title: message,
										duration: 1000,
										icon: 'none'
									})
								}
							},
							error: function(err) {
							}
						})
					}
				} else {
					if (!this.old_phone) {
						uni.showToast({
							title: '请先获取验证码！',
							duration: 1000,
							icon: 'none'
						})
					} else if (!this.phone_code) {
						uni.showToast({
							title: '验证码不能为空！',
							duration: 1000,
							icon: 'none'
						})
					} else if (this.phone != this.old_phone) {
						uni.showToast({
							title: '手机号码输入错误！',
							duration: 1000,
							icon: 'none'
						})
					} else if (this.phone_code.length != 6) {
						uni.showToast({
							title: '请输入完整的验证码！',
							duration: 1000,
							icon: 'none'
						})
					} else if (this.phone_code.length == 6 && this.phone == this.old_phone) {
						var data = {
							module: 'app',
							action: 'login',
							app: 'register',
							phone: this.phone,
							access_id: this.$store.state.access_id,
							keyCode: this.phone_code,
							clientid:uni.getStorageSync("cid")
						}
						if(this.fatherId!=''){
							data.pid=this.fatherId
						}
						// #ifdef MP-WEIXIN || MP-ALIPAY
						data.store_type = 1
						// #endif
						// #ifndef MP
						data.store_type = 2
						// #endif
			
						// 补充变量url，解决uni.request中url为undefined的问题
						var url =  uni.getStorageSync("url")
						uni.request({
							data,
							url,
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								let {
									data: {
										code,
										message,
										access_id,
										y_password,
										wx_status
									}
								} = res
								if (code == 200 && access_id) {
									
									me.$store.state.access_id = []
									uni.showToast({
										title: '登录成功！',
										duration: 1000,
										icon: 'none'
									})
									me.access_id(access_id)
									setStorage('access_id', access_id)
			                        uni.setStorageSync('user_phone',me.phone)
									//免注册登录下用账户或手机号登录
									uni.setStorageSync("LoingByHand",true);
									if(y_password == 0){
										uni.showModal({
											title: '提示',
											content: '您的账号还未设置密码，是否前往设置？',
											success: function (res) {
												if (res.confirm) {
													setTimeout(function() {
														uni.reLaunch({
															url: '../../pagesB/setUp/loginPassword',
														})
													}, 1000)
												} else if (res.cancel) {
													setTimeout(function() {
														if(me.fatherId != '' && me.fatherId != undefined){
															uni.navigateTo({
																url: '../../pagesA/distribution/distribution_center',
																success: function() {
																	if (wx_status != 1) {
																		me.$store.state.shouquan = true
																	}
																}
															})
														}else{
															uni.reLaunch({
																url: '../tabBar/my',
																success: function() {
																	if (wx_status != 1) {
																		me.$store.state.shouquan = true
																	}
																}
															})
														}
													}, 1000)
												}
											}
										});
									}else{
										setTimeout(function() {
											if(me.fatherId != '' && me.fatherId != undefined){
												uni.navigateTo({
													url: '../../pagesA/distribution/distribution_center',
													success: function() {
														if (wx_status != 1) {
															me.$store.state.shouquan = true
														}
													}
												})
											}else{
												uni.reLaunch({
													url: '../tabBar/my',
													success: function() {
														if (wx_status != 1) {
															me.$store.state.shouquan = true
														}
													}
												})
											}
										}, 1000)
									}
								} else {
									uni.showToast({
										title: message,
										icon: 'none'
									})
								}
							},
						})
					}
				}
			},
			// 验证码登录 手机号聚焦
			_pone_f() {
				this.codeLoginCodePH = ''
				this.pone_f = true
			},
			// 验证码登录 手机号输入
			_codeChangePhone: function(e) {
				if (e.target.value.length == 11 && this.phone.length == 11 &&　this.phone_codeStatus1) {
					this.codeLoginBtnStatus = true
				} else {
					this.codeLoginBtnStatus = false
				}
			},
			//手机号码正则验证 type2验证码登录输入手机号，3注册输入手机号
			_telephone(value, type) {
				this.one_code = telephone(value)
				lkt_telephone(type, this)
			},
			// 验证码登录 验证码聚焦
			_codeF() {
				this.codeLoginPWPH = '';
				this.codeLoginBtnStatus = true;
			},
			// 验证码登录 验证码输入
			_codeChangeCode: function(e) {
				if (e.target.value.length == 6 && this.phone.length == 11 && this.phone_codeStatus1) {
					this.codeLoginBtnStatus = true
				} else {
					this.codeLoginBtnStatus = false
				}
			},
			// 验证码登录 验证码失焦
			_codeB() {
				this.codeLoginPWPH = this.codeLoginPWPH1
			},
			//获取验证码 type1验证码登录 2注册
			_phone_code(type) {
				console.log('====')
				lkt_phone_code(type, this)
			},	
			//密码登录to验证码登录
			_phone() {
				this.landing = false
				this.codeLoginBtnStatus = false
				this.phone_codeStatus1 = false
				this.account = ''
				this.password = ''
			},
			//验证码登录to密码登录
			_landing_passw() {
				this.pwLoginBtnStatus = false
				this.landing = true
				this.phone = ''
				this.phone_code = ''
			},
			_navigateTo(url) {
				uni.navigateTo({
					url
				})
			}
		},
		computed: {
			halfWidth() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				// #ifdef MP-TOUTIAO
				const info = uni.getSystemInfoSync()
				if(info.platform != 'ios'){
					he=0
				}
				// #endif
				return uni.upx2px(he) + 'px';
			},
		},
	}
</script>

<style scoped>

	@import url("../../static/css/login/login.css");
</style>
