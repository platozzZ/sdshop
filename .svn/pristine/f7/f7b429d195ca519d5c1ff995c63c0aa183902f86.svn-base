<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<ul class='setup-ul yh-setup-ul'>
			<li>
				<input type="number" v-model="user_phone" disabled="true">
			</li>
			
			<li class='last'>
				<input placeholder-style="color: #b8b8b8;" class='input' :class='{marginleft:display}' type="number" placeholder="请输入手机验证码" v-model="codeone" style="flex: 1;">
			
				<div class='color yh-color' v-if='display' @tap="_verif()">获取验证码</div>
			
				<div class='active yh-color' v-if='!display'>
					<span ref='time' class="yh-time">{{count}}S</span>
					后再次获取
				</div>
			</li>
			
			<li>
				<input  placeholder-style="color:#b8b8b8" type="password" maxlength="6" placeholder="请输入6位支付密码" v-model="onepay" @blur='_blur(1)' >
			</li>
			<li>
				<input  placeholder-style="color:#b8b8b8" type="password" maxlength="6" placeholder="确认支付密码" v-model="twopay" @blur='_blur(2)' >
			</li>
			<li id='setupButtomWrap' class="yh-setupButtomWrap">		
				<div class='setup-buttom yh-setup-buttom' @tap="_sub">确认</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import { telephone } from '../../common/landing.js'
	import { getStorage } from '../../common/storage.js'
	
	export default {
		data(){
			return{
				title:'设置支付密码',
				display: true,
				count: '',
				timer: null,
				code: "",
				onepay:'',					// 第一次支付密码
				twopay:'',					// 第二次支付密码
				codeone:'',					// 验证码
				user_phone:'',				// 旧手机号
				access_id:'',
				guan:false,
				guan_word:"",
				fastTap:true,
			}
		},
		mounted(option){
			let me = this;
			setTimeout(function(){
				console.log("=====>");
				console.log(me.$refs);
				if(me.$refs.lktAuthorizeComp){
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
						me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
						me.user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : me.$store.state.user_phone
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
					})
				}
			},100);
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
			 * 验证码发送1分钟倒计时
			 * */
			_verif() {
				var me = this;
				var data = {
					module: 'app',
					action: 'user',
					app: 'secret_key',
					phone:this.user_phone,
					message_type: 0, // 短信类型 0.验证码 1.短信通知
					message_type1: 5 // 短信类别 5.修改支付密码
				}
				console.log(data)
				if(this.user_phone){
					if(!this.fastTap){
						return
					}
					this.fastTap=false
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							me.fastTap=true
							let {data: {code,message}} = res
							if(code!=200) {
								uni.showToast({
									title: message,
									duration: 1000,
									icon:'none'
								})
							} else if(code == 200) {
								me._time()
								const TIME_F = 60
								let count_f = TIME_F
								console.log(TIME_F,count_f)
								let timer_f = setInterval(() => {
									if(count_f > 0 && count_f <= TIME_F) {
										count_f--
									} else {
										clearInterval(timer_f);
										timer_f = null
										me.code=''
									}
								}, 1000)
							}
							console.log(res)
						},
						error:function(err){
							console.log(err)
							me.fastTap=true
						},
					})
				}else{
					uni.showToast({
						title: "未获取到正确的手机号码！",
						duration: 1000,
						icon:'none'
					})
				}
			},
			/**
			 * 1分钟倒计时
			 * */
			_time() {
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.display = false;
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
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
			_blur(type){
				console.log(type)
				var me = this
				var val = me.onepay
				if(type == 2){
					val = me.twopay
				}
				var numReg = /^[0-9]+$/
				var numRe = new RegExp(numReg)
				if(val.length != 6){
					uni.showToast({
						title: "请输入6位支付密码！",
						duration: 1500,
						icon:'none'
					})
					return false
				}
				if (!numRe.test(val)) {
					if(type == 1){
						me.onepay = ''
					}else if(type == 2){
						me.twopay = ''
					}
					uni.showToast({
						title: "支付密码全部由数字组成！",
						duration: 1500,
						icon:'none'
					})
					return false
				}
			},
			/**
			 * 
			 * */
			_sub(){
				var me = this
				console.log(this.codeone)
				var numReg = /^[0-9]+$/
				var numRe = new RegExp(numReg)
				if (!numRe.test(me.onepay) || !numRe.test(me.twopay)) {
					uni.showToast({
						title: "支付密码全部由数字组成！",
						duration: 1500,
						icon:'none'
					})
					return false
				}
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				
				if(this.onepay!=''&&this.onepay!=this.twopay){
					uni.showToast({
						title: "两次密码输入不一致！",
						duration: 1000,
						icon:'none',
						success:function(res){
							me.fastTap=true
						}
					})
				}else if(this.onepay.length!=6&&this.onepay.length!=6){
					uni.showToast({
						title: "请设置六位数密码！",
						duration: 1000,
						icon:'none',
						success:function(res){
							me.fastTap=true
						}
					})
				}
				else if(this.onepay!=''&&this.onepay===this.twopay){
					var data = {
						module: 'app',
						action: 'user',
						app: 'set_payment_password',
						access_id:this.access_id,
						phone:this.user_phone,
						password:this.twopay,
						keyCode:this.codeone
					}
					console.log(data)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							console.log(res)
							let {data:{code,message}} = res
							console.log(code,message)
							if(code==200){
								uni.showToast({
									title: "设置成功！",
									duration: 1500,
									icon:'none'
								})
								setTimeout(function(){
									me.fastTap=true
									uni.navigateBack({
											delta: 1
									})
								},1500)
							}else{
								uni.showToast({
									title: message,
									duration: 1000,
									icon:'none',
									success:function(res){
										me.fastTap=true
									}
								})
							}
						},
						error:function(err){
							console.log(err)
							me.fastTap=true
						},
					})
				}
				else{this.fastTap=true}
				
			}
		},
		components: {
			Heads
		},
	}
</script>

<style scoped>
	@import url("../../static/css/setUp/payment.css");
</style>