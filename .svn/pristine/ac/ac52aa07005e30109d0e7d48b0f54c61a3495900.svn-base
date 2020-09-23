<template>
	<div>
		<heads :title='title'></heads>
		<div v-if='pass' style='position: relative;'>
			<div class='login'>
			<div class='login_inpu loginsss'>
				<input placeholder-style="color:#b8b8b8" type="text" placeholder="请输入账号"  :disabled="phoneS"  v-model="zhanghao" @focus="_phone_t(1)" @blur='_telephone(phone,1)' @input="_changeStep"/>
				<img :src="del" v-show="zhanghao.length&&phone_t" @tap="_empty(1)" />
			</div>
			<div class='login_inpu loginsss' v-show='code_dis'>
				<input type="number" placeholder-style="color:#b8b8b8" placeholder="验证码" v-model="phone_code" @input="_changeStep1" />
				<div class='login_p' :class="time_code === '获取验证码'?'':'b'" v-text="time_code" @tap="_code()"></div>
			</div>
		</div>
		<div class='button a1' :class = "{active:changeStep}" @tap="_next_one" v-if='next'>下一步</div>
		<div class='button a2' :class = "{active:changeStep}" @tap="_next_two" v-if='!next'>下一步</div>
		</div>
		<!--  重置密码    -->
		<div v-if='!pass' >
			<div class='login' style='position: relative;'>
				<div class='login_inpu loginsss'>
					<input v-if='!pwFlag' type="password" placeholder="请输入6-15位数字或字母密码!" placeholder-style="color:#b8b8b8"  v-model="new_password" @focus="_phone_t(2)" @blur="_w_password(1)" @input="_changeStep2"/>
					<input v-else type="text" placeholder="请输入6-15位数字或字母密码!" placeholder-style="color:#b8b8b8"  v-model="new_password" @focus="_phone_t(2)" @blur="_w_password(1)" @input="_changeStep2"/>
					<img v-if='!pwFlag' :src="pwShow" @tap="_seepw(1)"/>
					<img v-else :src="pwHide" @tap="_seepw(1)"/>
				</div>
				<div class='login_inpu loginsss'>
					<input v-if='!pwFlag1' type="password" placeholder="确认新密码" placeholder-style="color:#b8b8b8" v-model="old_password"  @focus="_phone_t(3)" @blur="_w_password(2)" @input="_changeStep2"/>
					<input v-else type="text" placeholder="确认新密码" placeholder-style="color:#b8b8b8" v-model="old_password"  @focus="_phone_t(3)" @blur="_w_password(2)" @input="_changeStep2"/>
					<img v-if='!pwFlag1' :src="pwShow" @tap="_seepw(2)"/>
					<img v-else :src="pwHide" @tap="_seepw(2)"/>
				</div>
				<div class='button buttons' :class = "{active:changeStep}" @tap="_next_three">保存</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import { telephone } from '../../common/landing'
	import { onblur } from '../../common/landing'
	import heads from '../../components/header.vue'
	export default {
		data() {
			return {
				phoneS:false,
				fastTap:true,
				del:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/delete2x.png',
				pwShow:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/pwShow.png',
				pwHide:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/pwHide.png',
				title: '找回密码',
				phone: '',
				phone_next: '',
				code_dis: false,
				phone_code: '',
				old_phone: '',
				count: '',
				timer: null,
				time_code: '获取验证码',
				next:true,
				pass:true,
				pwFlag:false,
				pwFlag1:false,
				old_password:'',
				new_password:'',
				phone_t:'',
				new_password_f:'',
				old_password_f:'',
				changeStep: false,
				zhanghao: '',
				codeBtnAllowClick:false,//获取验证码按钮是否允许点击
				isInput: false
			}
		},
		onShow() {
			this.codeBtnAllowClick = true;
		},
		methods: {
			_seepw(index){
				if(index==1){
					this.pwFlag=!this.pwFlag
					return
				}
				this.pwFlag1=!this.pwFlag1
			},
			_changeStep (e){
				if (e.detail.value !== "") {
					this.isInput = true;
					this.changeStep = true;
					
				}else {
					this.changeStep = false
				}
				this.zhanghao = e.detail.value;
			},
			_changeStep1 (e){
				if (e.detail.value.length === 6) {
					this.isInput = false;
					this.changeStep = true;
				}else {
					this.changeStep = false
				}
			},
			_changeStep2 (e){
				if (e.detail.value == this.new_password || e.detail.value == this.old_password) {
					this.isInput = true;
					this.changeStep = true;
				}else {
					this.changeStep = false
				}
			},
			_phone_t(type){
				if(type==1){
					this.phone_t = true
				}else if(type==2){
					this.new_password_f = true
				}else if(type==3){
					this.old_password_f = true
				}
				
			},
			_w_password(type){
				if(type==1){
					 // this.new_password_f = false
					  this.new_password_f = true
				}else if(type==2){
					 // this.old_password_f = false
					  this.old_password_f = true
				}
			},
			_telephone(value,type) {
				/*this.phone_next = telephone(value)*/
				if(type==1){
					this.phone_t = true
				}
			},
// 			_telephone (e) {
// 				console.log(e.detail.value)
// 				if (e.detail.value === "") {
// 					console.log(e.detail.value)
// 					this.changeStep = false;
// 					// this.phone_t = false
// 				}
// 			},
			_next_one() {
				if (!this.isInput){ return }
				// this.phone_next = telephone(this.phone)
				// this.zhanghao = onblur(this.zhanghao,)
				var me = this
				// console.log(this.phone_next)
				// if(this.phone_next == 1) {
				// 注释掉下面两行能解决：未注册账号会跳转到找回密码的验证码发送界面
					// me.next = false
					// me.code_dis = true
					
					// me._code()
					var data = {
						module:'app',
						action:'login',
						// app:'forget',
						// phone:this.phone
						app:'forget_zhanghao',
						zhanghao:this.zhanghao
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							console.log(res)
							let {data:{message,code,mobile}} = res
							if(code==200){
								me.next = false
								me.code_dis = true
								this.phoneS = true
								this.phone_t = false
								this.zhanghao = mobile
								this.changeStep = false
								
								
								
					//  注释掉  me._code() 解决这个提示（获取失败）每次都出现		
								// me._code()
								
							}else{
								uni.showToast({
									title: message,
									duration: 1000,
									icon:'none'
								})
							}
						},
						error:function(err){
							console.log(err)
					}
					})
				// }
			},
			_next_two(){
				if (this.isInput){ return }
				console.log(this.zhanghao)
				var me = this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				if(!this.phone_code&&this.code_dis){
						uni.showToast({
  								title: '验证码不能为空！',
  								duration: 1500,
								icon:'none'
							})
						setTimeout(function(){
							me.fastTap=true
						},1500)
				}else if(this.phone_code.length!=6){
						uni.showToast({
  								title: '验证码输入错误！',
  								duration: 1500,
								icon:'none'
							})
						setTimeout(function(){
							me.fastTap=true
						},1500)	
				}
				else if(this.phone_code.length==6&&this.phoneS){
						uni.request({
							data:{
								module:'app',
								action:'login',
								app:'forget_code',
								phone:me.zhanghao,
								keyCode:me.phone_code
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								let {data:{code,message}}=res
								console.log(res,code)
								
								if(code==200){
									me.title = '重置密码'
									me.changeStep = false
									me.pass = false
								}
								else{
									uni.showToast({
										title:message,
										duration:1500,
										icon:'none'
									})
								}
								setTimeout(function(){
									me.fastTap=true
								},1500)
							},
							error:function(){
								me.fastTap=true
							}
						})
				}
			},
			//叉，清空内容
			_empty(val){
				if(val==1){
					this.zhanghao ='';
				}else if(val==2){
					this.new_password=''
				}else if(val==3){
					this.old_password=''
				}
			},
			_newpassword(){
				// var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				let re = /^[a-z0-9]{6,15}$/i;
				if(this.new_password!=''){
					this.rez = re.test(this.new_password);
					if(this.rez == true) {
						return 1
					}else {
						uni.showToast({
  								title: '请输入6-15位数字或字母账号！',
  								duration: 2000,
								icon:'none'
							})
					}
				}
			},
			_next_three(){
				if (!this.isInput){ return }
				var type = this._newpassword()
				console.log(type)
				var me = this
				if(type==1){
					if(this.old_password==this.new_password&&this.new_password!=''&&this.phone_code.length==6){
						var data ={
							module:'app',
							action:'login',
							app:'forgotpassword',
							phone:this.zhanghao,
							password:this.new_password,
							keyCode:this.phone_code
						}
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								console.log(res)
								let {data:{message,code}} = res
								if(code==200){
									uni.showToast({
										title:message,
										icon:'none',
										duration:1000
									})
									setTimeout(function(){
										uni.redirectTo({
											url:'login?toHome=true'
										})
									},1000)
								}else{
									uni.showToast({
										title:message,
										icon:'none'
									})
								}
							},
							error:function(err){
								console.log(err)
							}
						})
					}
					else{
						uni.showToast({
								title: '两次密码输入不一致，请重新输入！',
								duration: 1000,
								icon:'none'
						})
					}
				}else{
					uni.showToast({
  							title: '密码格式错误！',
  							duration: 1000,
							icon:'none'
						})
				}
			},
			_code() {
				var me = this
				if(!me.codeBtnAllowClick){
					console.log("正在获取验证码..");
					return ;
				}
				me.codeBtnAllowClick = false;
				var data ={
						module:'app',
						action:'user',
						app:'secret_key',
						phone:this.zhanghao,
				}
				console.log(data)
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						let {data: {code,message}} = res
						if(code == 220) {//短信发送频率超限
							uni.showToast({
								title: message,
								duration: 1000,
								icon:'none'
							});
							
						} else if(code == 200) {
							me.phoneS=true
							const TIME_COUNT = 60;
							if(!me.timer) {
								me.count = TIME_COUNT;
								me.timer = setInterval(() => {
									if(me.count > 0 && me.count <= TIME_COUNT) {
										me.count--;
										me.time_code = `${me.count}s后可重获`;
									} else {
										clearInterval(me.timer);
										me.time_code = '获取验证码'
										me.timer = null;
										me.count = ''
										me.codeBtnAllowClick = true;
									}
								}, 1000)
							}
						}else{
							uni.showToast({
								title: "获取验证码失败，请稍后再试。",
								duration: 1000,
								icon:'none'
							});
						}
					},
					error:function(err){
						console.log(err);
					}
				})
			}
		},
		components:{
			heads,
		},
	}
</script>

<style scoped>
	@import url("../../static/css/login/retrievepassword.css");
</style>