<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative'>
			<div class='p_30'>
				<div class='moneyDiv'>
					
					<div>
						<div class='money'>{{account_money?account_money:'0.00'}}</div>
						<div>账户金额（元）</div>
					</div>
					
					<!-- <view class="contais">
						<view class="box">
							<view class="box-num">
								{{ integral_money }}
							</view>
							<view class="box-title">
								积分总额
							</view>
						</view>
						<view class="box">
							<view class="box-num">
								{{ all_money }}
							</view>
							<view class="box-title">
								收入总额(元)
							</view>
						</view>
					</view> -->
					
				</div>
				<div class='btnDiv' @tap='_toCha()'>
					<div>
						<img class='img' :src="tixian">
						<div >提现</div>
					</div>
					<div>
						<img class='jiantou' :src="jiantou">
					</div>
				</div>
				<div class='btnDiv' @tap='_toDetail()'>
					<div>
						<img class='img' :src="mingxi">
						<div >明细</div>
					</div>
					<div>
						<img class='jiantou' :src="jiantou">
					</div>
				</div>
				
				<div class='explain' v-if='illustrate'>
					<div>提现说明</div>
					<div>
						<rich-text :nodes="illustrate"></rich-text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import htmlParser from '@/common/html-parser.js'

	export default {
		data() {
			return {
				title: '我的提现',
				access_id: '',
				mingxi: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/mingxi.png',
				tixian: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/tixian.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				shop_id: '',
				account_money: 0.00,
				all_money: 0.00,
				integral_money: 0,
				illustrate: ''
			}
		},
		onLoad(option){
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '/pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.shop_id = uni.getStorageSync('shop_id') ? uni.getStorageSync('shop_id') : me.$store.state.shop_id
					me._axios()
				});
			});
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				this._axios()
			},
			_axios(){
				var me=this
				uni.showLoading({
					title:'加载中'
				})
				uni.request({
					data:{
						access_id:me.access_id,
						module:'app',
						action:'mch',
						m:'my_wallet',
						shop_id:me.shop_id
					},
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						uni.hideLoading();
						if(res.data.code==200){
							me.account_money = res.data.account_money
							me.integral_money = res.data.integral_money
							me.all_money = res.data.all_money
							me.illustrate = htmlParser(res.data.illustrate)
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
					}
				})
			},
			_toCha(){
				uni.navigateTo({
					url:'/pagesB/myWallet/putForward?type=store'
				})
			},
			_toDetail(){
				uni.navigateTo({
					url:'./myFinance'
				})
			},
		},
		components: {
			heads
		},
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/myStore/myCha.less");
</style>
