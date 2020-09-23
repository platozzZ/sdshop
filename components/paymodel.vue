<template>
	<view class="payModel" v-if="show">
		<view class="payModel-msg" @touchmove.stop.prevent @click="cancel"></view>
		<view class="payModel-card" @touchmove.stop.prevent>
			
			<view class="payModel-card-head">
				<text>输入支付密码</text>
				<image :src="qiandaoguanbiimg" @click="cancel"></image>
			</view>
			
			<view class="payModel-card-body">
				<view class="">
					
				</view>
				
				<view class="code">
					<template v-for="(item,index) in password">
						<view class="code-item" :key="index">
							{{ item.text}}
						</view>
					</template>
				</view>
				
				<view class="forget">
					<text @click="forgetPW">忘记密码</text>
				</view>
			</view>
			
			<view class="payModel-card-keyboard">
				<view class="keyboard">
					
					<template v-for="(item,index) in numlist">
						<view :key="index" v-if="item > 0" @click="enterPassword(item)">
							{{ item }}
						</view>
						<view :key="index" v-else class="box0" :class="{ box1: item === '' }" @click="enterPassword(item)">
							{{ item }}
						</view>
					</template>

					<view class="" @click="deletePassword" style="background: #EAE9E8;">
						删除
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	let passlist = []
	
	for(let i = 0; i < 6;i++){
		passlist.push({ text:'',pass:'' })
	}
	
	export default {
		props:['value'],
		data(){
			return {
				numlist:[1,2,3,4,5,6,7,8,9,'',0],  // 密码数组
				password:passlist,							// 密码对象
				conu:6,													// 最大密码
				num:0,													// 密码下标
				qiandaoguanbiimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				show:false											// 控制密码框
			}
		},
		watch:{
			value:function(val){
				this.show = val
			},
			show:function(val) {
				this.$emit("input",val)
			}
		},
		methods:{
			/**
			 * add密码
			 * */ 
			enterPassword:function(item){
				if(item === ''){
					return
				}
				
				if(this.num >= this.conu){
					return
				}
				this.password[this.num].text = '●'
				this.password[this.num].pass = item
				this.num++
				
				// 密码输入等于6 自动完成
				if(this.num === this.conu){

					let pass = ''
					for(let item of this.password){
						pass += item.pass.toString()
					}
					
					this.success(pass)
				}
			},
			/**
			 * 删除已输入密码
			 * */
			deletePassword:function(){
				if(this.num == 0){
					return
				}
				this.password[this.num-1].text = ''
				this.password[this.num-1].pass = ''
				this.num--
			},
			/**
			 * 关闭密码输入框
			 * */
			cancel:function(){
				this.restorePassword()
				this.$emit('cancel')
			},
			/**
			 * 初始化组件内数据
			 * */
			restorePassword:function(){
				this.show = !this.show
				for(let item of this.password){
					item.text = ''
					item.pass = ''
				}
				this.num = 0
			},
			/**
			 * 自动完成回调函数
			 * */
			success:function(pass){
				this.$emit('success',pass)
				this.restorePassword()
			},
			/**
			 * 找回密码
			 * */
			forgetPW:function() {
				uni.navigateTo({
					url: '../../pagesB/setUp/paymentPassword'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.payModel {
		position: fixed;
		top: 0;
		
		width: 100%;
		display: flex;
		align-items: flex-end;
		min-height: 100vh;
		z-index: 9999;
		
		&-msg {
			width: 100%;
			min-height: 100vh;
			z-index: 100001;
			background-color: rgba(000, 000, 000, 0.5);
			position: absolute;
		}
		
		&-card {
			width: 100%;
			height: 745rpx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			z-index: 100002;
			&-head {
				height: 86rpx;
				border-bottom: 2rpx solid #DDDDDD;
				display: flex;
				align-items: center;
				padding: 0rpx 30rpx;
				justify-content: flex-end;
				
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}
				
				text {
					flex: 1;
					text-align: center;
				}
				
				color: #020202;
				font-size: 34rpx;
				font-weight: bold;
			}
			
			&-body {
				flex: 1;
				
				.code {
					display: flex;
					justify-content: center;
					margin-top: 60rpx;
					&-item {
						width: 80rpx;
						height: 80rpx;
						border: 2rpx solid #DDDDDD;
						
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				
				.forget {
					text-align: end;
					margin: 0rpx 30rpx;
					margin-top: 20rpx;
					color: #0080FF;
				}
			}
			
			&-keyboard {
				height: 360rpx;
				
				.keyboard {
					display: flex;
					height: 360rpx;
					flex-flow: wrap;
					background: #EAE9E8;
					
					view {
						background: #FFFFFF;
						font-size: 40rpx;
						font-weight: bold;
						color: #020202;
						border: 2rpx solid #DDDDDD;
						margin-left: -1px;
						margin-top: -1px;
						display: flex;
						align-items: center;
						justify-content: center;
				
						height: 86rpx;
						width: 248rpx;
					}
				}
				
				.box0 {
					grid-column-start: 2;
				}
				

			}
		}
	}
	
	.box1 {
		background: #EAE9E8 !important;
	}
</style>
