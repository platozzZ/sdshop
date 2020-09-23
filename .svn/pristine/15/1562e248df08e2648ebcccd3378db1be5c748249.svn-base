<template>
	<view class="orderdetails">
		<heads title="编辑订单" />
		<toload :load="load">
		<view class="statusbox">
			<view class="statusbox-title">
				待发货
			</view>
			
			<view class="statusbox-body">
				
				<view class="statusbox-body-left">
					
					<view>
						订单编号：{{order_sNo}}
					</view>
					
					<view v-if="type=='ms'">
						秒杀时间：2018-08-04 12:56:27
					</view>
					<view v-else-if="type=='pt'">
						参团时间：2018-08-04 12:56:27
					</view>
				</view>
				
				<view class="statusbox-body-right" type="button" @tap='onCopy()'>
					复制
				</view>
				
			</view>
		</view>
		
		<view class="userbox">
			<view class="userbox-item">
				<image class="userimg" :src="buyhead"></image>
				<text>买家：镜花水月</text>
			</view>
			
			<view class="userbox-item" style="border-top: 1px solid #EEEEEE;">
				<image class="userimg" :src="buyadd" style="width: 30rpx;height: 36rpx;"></image>
				<view class="flex-start">
					<text>收件人姓名</text>
					<input type="text" v-model="name">
				</view>
				<img :src="jiantou" class='jiantou' />
			</view>
			
			<view class="userbox-item" style="border-top: 1px solid #EEEEEE;">
				<view style="width: 52rpx;"></view>
				<view class="flex-start">
					<text>联系电话</text>
					<input type="text" v-model="tel">
				</view>
				<img :src="jiantou" class='jiantou' />
			</view>
			
			<view class="userbox-item" style="border-top: 1px solid #EEEEEE;">
				<view style="width: 52rpx;"></view>
				<view class="flex-start">
					<text>收件地址</text>
					<input type="text" v-model="address">
				</view>
				<img :src="jiantou" class='jiantou' />
			</view>
			
		</view>
		
		<view class="list">
			<view class="itembox" v-for="(item,index) in 2" :key="index">
				<image src="http://ww1.sinaimg.cn/bmiddle/9150e4e5gy1gbz3s925daj206y06ydg5.jpg"></image>
				<view class="itembox-body">
					
					<view class="product">
						<view class="product-title">
							特级大红袍特级大红袍特级大红袍特 级大红袍特级大红袍特级大红袍特级大红袍特级大红袍特 级大红袍特级大红袍
						</view>
						
						<view class="product-money">
							<view>
								￥1000.00
							</view>
							<view>
								x2
							</view>
						</view>
					</view>
					
					<view class="property">
						特级，1000g
					</view>
				</view>
			</view>
		</view>
		<view class="resbox">
			<view class="resbox-top">
				<text>商品总价：</text>
				<text>￥118.00</text>
				<text>运费：</text>
				<text>￥0.00</text>
				<text>订单总价：</text>
				<text>￥177.00</text>
			</view>
			<view class="resbox-bottom">
				<text>实收款</text>
				<text style="color: #FF0000">￥177.00</text>
			</view>
		</view>
		
		<!-- 拼团数据 -->
		<view class="fightbox" v-if="type=='pt'">
			<view class="">
				拼团人员：晒共都没发(团长)、镜花水月 
			</view>
			
			<view class="">
				开团时间：2018-08-04 12:56:27
			</view>
			
			<view class="">
				成团时间：2018-08-04 12:56:27
			</view>
		</view>
		
		<view class="footbox footbtn">
			完成
		</view>
		<view class="footstance"></view>
		</toload>
		
	</view>
</template>

<script>
	// #ifdef H5
	import $ from "../../common/jquery.js"
	import { copyText } from '@/common/util.js'
	// #endif
	import heads from '@/components/header.vue'
	import toload from '@/components/toload.vue'
	export default {
		data(){
			return {
				load: true,
				type: '',
				order_sNo: '1010101010101010',
				buyhead:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/order_user.png',
				buyadd:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/order_dz.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				name: '郭美丽',
				tel: '1375864864',
				address: '长沙市岳麓区绿地中央广场5栋3408',
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		components: {
			heads,
			toload
		},
		methods:{
			onCopy: function() {
				console.log('onCopy_start_in');
				// onCopy(this,$)
				var me = this
				// #ifndef H5
				uni.setClipboardData({
					data: me.order_sNo,
					success: function(res) {
						console.log(me.order_sNo);
						uni.showToast({
							title: '复制成功',
							duration: 1500,
							icon: 'none'
						})
					}
				});
				// #endif
				// #ifdef H5
				copyText('',me.order_sNo)
				// #endif
			},
		}
	}
</script>

<style scoped>
	.orderdetails {
		min-height: 100vh;
		background: #F6F6F6;
	}
	
	.statusbox {
		background: #242424;
		padding: 29rpx 30rpx;
	}
	
	.statusbox-title {
		font-size:34rpx;
		font-weight:500;
		color:#FFFFFF;
	}
	
	.statusbox-body {
		color: #999999;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	
	.statusbox-body-left view {
		font-size: 22rpx;
	}
	
	.statusbox-body-right {
		border:2rpx solid rgba(187,187,187,1);
		border-radius:4rpx;
		padding: 9rpx 29rpx;
		align-self: flex-start;
		font-size: 22rpx;line-height: 22rpx;
	}
	
	.flex-start {
		display: flex;
		justify-content: space-between;
		flex: 1;
	}
	
	.userbox {
		background: #FFFFFF;
	}
	
	.userbox-item {
		height: 90rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		padding-right: 30rpx;
	}
	
	.userbox-item input{
		flex: 1;margin-left: 20rpx;font-size: 28rpx;color:#999999;text-align: right;
	}
	
	.userimg {
		width:32rpx;
		height:32rpx;
		margin-right: 20rpx;
		border-radius: 999em;
	}
	
	.flex-center {
		align-items: center;
	}
	
	.useradderss {
		font-size: 24rpx;
		font-weight: 500;
		color: #888888;
	}
	
	.userdata {
		font-size: 28rpx;
		font-weight: 500;
		color: #020202;
	}
	
	.footstance {
		height: 98rpx;
	}
	
	.userdata text:nth-child(1){
		margin-right: 42rpx;
	}
	
	.userbox::after {
		display: block;
		content: '';
		height: 20rpx;
		background: #F6F6F6;
	}
	
	/* 订单商品列表 start */
	.list {
		background: #FFFFFF;
	}

	.itembox {
		display: flex;
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	
	.itembox image {
		width:120rpx;
		height:120rpx;
		margin-right: 20rpx;
	}
	
	.itembox-body {
		flex: 1;
	}
	
	.product {
		display: flex;
	}
	
	.product-title {
		width: 383rpx;
		color: #020202;
		font-size: 24rpx;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.product-money {
		flex: 1;
	}
	
	.product-money view:nth-child(1){
		text-align: end;
		font-size:24rpx;
		font-weight:500;
		color:rgba(2,2,2,1);
	}
	
	.product-money view:nth-child(2){
		text-align: end;
		font-size:24rpx;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	
	.property {
		color: #999999;
		font-size: 22rpx;
		margin-top: 20rpx;
	}
	/* 订单商品列表 end */
	
	.footbox {
		height: 98rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background: #020202;
		font-size:30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	
	.resbox {
		background: #FFFFFF;
	}
	
	.resbox::after {
		display: block;
		content: "";
		height: 20rpx;
		background: #F6F6F6;
	}
	
	.resbox-top {
		border-top: 2rpx solid #EEEEEE;
		height: 166rpx;
		margin-left: 30rpx;
		padding-top: 30rpx;
		padding-right: 30rpx;
	}
	
	.resbox-top text {
		margin: 4rpx 0rpx;
	}
	
	.resbox-top text:nth-child(odd){
		float: left;
		clear: left;
	}
	.resbox-top text:nth-child(even){
		float: right;
		clear: right;
	}
	
	.resbox-top text:nth-child(-n+4){
		color: #999999;
		font-size: 24rpx;
	}
	
	.resbox-top text:nth-child(n+5){
		color: #333333;
		font-size: 28rpx;
	}
	
	.resbox-bottom {
		border-top: 2rpx solid #EEEEEE;
		height: 89rpx;
	}
	
	.resbox-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
	}
	
	.fightbox {
		background: #FFFFFF;
		padding: 30rpx 30rpx;
	}
	
	.fightbox view {
		font-size: 22rpx;
		font-weight: 500;
		color: #999999;
	}
	
	.jiantou{
		width: 15rpx;height: 27rpx;margin-left: 20rpx;
	}

</style>
