<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<toload :load="load">
			
			<view class="content">
				<view class="title">
					{{pro.name}}
					<text class="icon1" v-if="pro.status == 1">未开始</text>
					<text class="icon2" v-if="pro.status == 2">进行中</text>
					<text class="icon3" v-if="pro.status == 3">已结束</text>
				</view>
				
				<image class="image" :src="pro.image" mode="aspectFit"></image>
				
				<view class="list">
					<view class="list_left">活动类型：</view>
					<view class="list_right">{{pro.type == 'pt'?'拼团':'秒杀'}}</view>
				</view>
				
				<view class="list">
					<view class="list_left">活动时间：</view>
					<view class="list_right">
						{{pro.starttime}}
						<br>
						<text class="text">至</text>
						{{pro.endtime}}
					</view>
				</view>
				
				<view class="list">
					<view class="list_left">活动规则：</view>
					<view class="list_right" v-if="pro.type == 'pt'">
						{{pro.group_man}}人团，拼团时间为{{pro.group_time}}小时，用户最多可开团{{pro.group_kai_num}}个，参团{{pro.group_can_num}}次，{{pro.group_can_again==1?'可重复参团':'不可重复参团'}}
					</view>
					<view class="list_right" v-else-if="pro.type == 'ms'">
						{{pro.free_freight==1?'包邮':'不包邮'}}，秒杀时段分别为{{pro.buy_time1}}，限购{{pro.default_num}}个
					</view>
				</view>
				
				<view class="list">
					<view class="list_left">报名时间：</view>
					<view class="list_right">
						{{pro.join_starttime}}
						<br>
						<text class="text">至</text>
						{{pro.join_endtime}}
					</view>
				</view>
			</view>
			
			<view style="height: 120rpx;"></view>
			
			<view class="btnBox" v-if="pro.status == 1">
				<view class="btn" @tap="navito('/pagesA/myStore/activities_add?id='+pro.id+'&type='+pro.type)">设置活动商品</view>
			</view>
		
		</toload>
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	export default {
		data(){
			return {
				title: '活动详情',
				access_id:'',
				pro: {},
				id: '',
				type: '',
				load: false
			}
		},
		components:{ heads, toload },
		onLoad(option) {
			this.id = option.id
			this.type = option.type
			if(this.type=='pt'){
				this.title="拼团活动详情"
			}else if(this.type=='ms'){
				this.title="秒杀活动详情"
			}
		},
		onShow(){
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.axios();
				});
			});
		},
		methods:{
			navito(url){
				uni.navigateTo({
					url
				})
			},
			axios(){
				let data = {
					module:'app',
					action: 'platform_activities',
					m: 'activity_details',
					access_id: this.access_id,
					id: this.id,
				}
				this.$req.post({data}).then(res=>{
					let { code, data, message } = res
					this.load = true
					if(code==200){
						this.pro = data[0]
					}else{
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		background-color: #FFFFFF;
		min-height: 100vh;
		
		.content{
			padding: 40rpx 30rpx;margin-bottom: 118rpx;
			
			.title{
				color: #020202;font-size: 36rpx;line-height: 41rpx;margin-bottom: 30rpx;
				
				.icon1,.icon2,.icon3{
					display: inline-flex;justify-content: center;align-items: center;
					width:82rpx;
					height:36rpx;
					
					border-radius:6rpx;
					font-size: 22rpx;
					margin-left: 14rpx;
				}
				.icon1{
					color: #FF6600;border:1px solid #FF6600;
				}
				.icon2{
					color: #FF0000;border:1px solid rgba(255,0,0,1);
				}
				.icon3{
					color: #999999;border:1px solid #999999;
				}
				
			}
			
			.image{
				width: 100%;
			}
			
			.list{
				display: flex;margin-top: 30rpx;
				
				&_left{
					font-size: 28rpx;
					color: #666666;
				}
				
				&_right{
					flex: 1;
					font-size: 28rpx;
					color: #020202;
					
					.text{
						color: #999999;margin-right: 10rpx;
					}
				}
			}
		}
		
		.btnBox{
			position: fixed;
			bottom: 0;left: 0;right: 0;
			height: 118rpx;padding: 14rpx 30rpx;
			box-sizing: border-box;
			box-shadow:0px -2rpx 24rpx 0px rgba(2,2,2,0.24);
			
			.btn{
				display: flex;justify-content: center;align-items: center;
				background-color: #020202;color: #FFFEFE;
				border-radius: 8rpx;
				font-size: 30rpx;
				width: 100%;height: 100%;
			}
		}
	}
</style>
