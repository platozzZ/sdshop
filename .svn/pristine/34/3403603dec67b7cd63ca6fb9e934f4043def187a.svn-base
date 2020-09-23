<template>
	<view class="toload">
		<view class="t-h" v-if="!load">
			<view class="loadbox">
				<image class="loadbox-img" :src="loadGif" mode=""></image>
				<view class="loadbox-text">加载中…</view>
			</view>
		</view>
		<slot v-else>
			
		</slot>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
			}
		},
		props:['load']
	}
</script>

<style scoped>
	.toload {
		/* min-height: calc(100vh - 90rpx); */
	}
	
	.t-h {
		display: flex;
		align-items: center;
		
		min-height: calc(100vh - 200rpx);
	}
	
	.loadbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		background-color: rgba(000, 000, 000, 0.6);
		margin: 0 auto;
		
	}
	
	.loadbox-img {
		width: 40rpx;
		height: 40rpx;
		margin: 50rpx 0 20rpx 0;
	}
	
	.loadbox-text {
		margin-top: 20rpx;
		color: #fff;
	}
</style>
