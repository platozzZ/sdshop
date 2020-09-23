<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		
		<toload :load="load">
			<view class="activity" v-for="(item,index) in list" :key="index" @tap="navito('/pagesA/myStore/activities_details?id='+item.id+'&type='+item.type)">
				<image class="image" :src="item.image"></image>
				<view class="activity_right">
					<view class="activity_title">
						<view class="icon" v-if="item.type=='pt'">拼团</view>
						<view class="icon1" v-else-if="item.type=='ms'">秒杀</view>
						<view class="view">
							{{item.name}}
						</view>
					</view>
					<view class="activity_time">活动时间：{{item.starttime}}至{{item.endtime}}</view>
					<view class="activity_btnBox" @tap.stop>
						<text class="status1" v-if="item.status == 1">未开始</text>
						<text class="status2" v-if="item.status == 2">进行中</text>
						<text class="status3" v-if="item.status == 3">已结束</text>
						
						<view class="btn" v-if="item.status == 1&&item.status1 == 0" @tap="navito('/pagesA/myStore/activities_details?id='+item.id+'&type='+item.type)">参与报名</view>
						<view class="btn" v-if="item.status == 2 || item.status1 == 1" @tap="navito('/pagesA/myStore/activities_pro?id='+item.id+'&type='+item.type)">活动商品</view>
						<view class="btn" v-if="item.status == 3&&item.status1 == 0">删除活动</view>
					</view>
				</view>
			</view>
			<view v-if="list.length == 0">
				<image class="no_active" :src="no_active"></image>
				<view style="font-size: 32rpx;text-align: center;color: #666;line-height: 32rpx;margin-top: 16rpx;">暂无活动信息~</view>
			</view>
			<loadmore v-if="list.length>9" :loadingType="loadingType"></loadmore>
		</toload>
	
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	import loadmore from '@/components/uni-load-more.vue'
	export default {
		data(){
			return {
				title: '活动管理',
				access_id:'',
				page: 1,
				list: [],
				scrollFlag: true,
				load: false,
				loadingType: 0,
				
				no_active: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/no_active.png'
			}
		},
		components:{ heads, toload, loadmore },
		onLoad() {
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.list = []
					me.scrollFlag = true
					me.page = 1
					me.axios();
				});
			});
		},
		onReachBottom() {
			this.loadingType = 1
			this.page++
			this.axios()
		},
		methods:{
			axios(){
				let data = {
					module:'app',
					action: 'platform_activities',
					m: 'index',
					access_id: this.access_id,
					page: this.page,
					mch_id: this.$store.state.shop_id?this.$store.state.shop_id:uni.getStorageSync('shop_id')
				}
				this.$req.post({data}).then(res=>{
					let { code, data, message } = res
					this.load = true
					if(code==200){
						data.filter(item=>{
							item.starttime = item.starttime.substr(0,10)
							item.endtime = item.endtime.substr(0,10)
						})
						
						if(!data.length){
							this.loadingType = 2
							
						}
						
						if(data.length > 10){
							this.loadingType = 0
						}
						
						this.list.push(...data)
					}else{
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
				})
			},
			navito(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		background-color: #F7F4F8;
		min-height: 100vh;
		
		.activity{
			display: flex;
			width:750rpx;
			height:261rpx;
			background:rgba(255,255,255,1);
			padding: 30rpx;box-sizing: border-box;
			
			.image{
				width: 220rpx;height: 200rpx;margin-right: 25rpx;
			}
			
			&_right{
				flex: 1;overflow: hidden;
				display: flex;flex-direction: column;
			}
			
			&_title{
				position: relative;
				margin-bottom: 20rpx;
				
				.view{
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap:break-word;
					text-indent: 70rpx;
					font-size: 28rpx;
				}
				
				.icon,.icon1{
					position: absolute;left: 0;top: 0;
					display: inline-block;
					color: #FEFEFE; font-size: 22rpx; padding: 2rpx 6rpx;  white-space: nowrap;border-radius:13rpx;
					margin-right: 10rpx;
					text-indent: 0;
				}
				
				.icon{
					background: #FF3333;
				}
				
				.icon1{
					background: #F1A100;
				}
			}
			
			&_time{
				color: #999999;font-size: 24rpx;line-height: 24rpx;
			}
			
			&_btnBox{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: auto;
				
				.status1{
					font-size: 28rpx;color: #FF6600;
				}
				.status2{
					font-size: 28rpx;color: #FF0000;
				}
				.status3{
					font-size: 28rpx;color: #666666;
				}
				
				.btn{
					display: flex;align-items: center;justify-content: center;
					width:140rpx;
					height:50rpx;
					border:1px solid rgba(2,2,2,1);
					border-radius:6rpx;
					box-sizing: border-box;
					font-size: 24rpx;color: #020202;
				}
			}
		}
	
		
		.no_active{
			display: block;margin: 200rpx auto 0;
			width: 240rpx;height: 272rpx;
		}
		
		
	}
</style>
