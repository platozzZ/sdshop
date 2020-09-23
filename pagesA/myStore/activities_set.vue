<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<template v-if="!edit">
			<view class="proBox" v-for="(item,index) in list" :key="index">
				<view class="pro">
					<image class="image" :src="item.imgurl"></image>
					<view style="flex: 1;overflow: hidden;">
						<view class="proTitle">
							{{item.name}}
						</view>
						
						<view class="proSize">
							规格：{{item.attr}}
						</view>
						
						<view class="priceBox">
							<view class='price'>￥{{item.price}}</view>
							<view class="size">库存：{{item.num}}</view>
						</view>
					</view>
				</view>
				
				<view class="proIpt" style="border-bottom: 1px solid #EEEEEE;">
					<view class="text">活动成本价：</view>
					<input class="ipt" type="number" min="1" :max="item.price" placeholder="请输入活动成本价" v-model="item.act_price">
				</view>
				
				<view class="proIpt">
					<view class="text">活动库存：</view>
					<input class="ipt" type="number" min="1" :max="item.num" placeholder="请输入活动库存" v-model="item.act_num">
				</view>
			</view>
			
			<view class="btnBox">
				<view class="btn" @tap="request(false)">保存到本地</view>
				<view class="btn" @tap="request(true)">提交审核</view>
			</view>
		</template>
		
		<template v-else>
			<view class="proBox">
				<view class="pro">
					<image class="image" :src="list.img"></image>
					<view style="flex: 1;overflow: hidden;">
						<view class="proTitle">
							{{list.group_title}}
						</view>
						
						<view class="proSize">
							规格：{{list.names}}
						</view>
						
						<view class="priceBox">
							<view class='price'>￥{{list.costprice}}</view>
							<view class="size">库存：{{list.num1}}</view>
						</view>
					</view>
				</view>
				
				<view class="proIpt" style="border-bottom: 1px solid #EEEEEE;">
					<view class="text">活动成本价：</view>
					<input class="ipt" type="number" min="1" :max="list.costprice" placeholder="请输入活动成本价" v-model="list.price">
				</view>
				
				<view class="proIpt">
					<view class="text">活动库存：</view>
					<input class="ipt" type="number" min="1" :max="list.num1" placeholder="请输入活动库存" v-model="list.num">
				</view>
			</view>
			
			<view class="btnBox">
				<view class="btn" @tap="request(true)">提交审核</view>
			</view>
		</template>
		
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	export default {
		data(){
			return {
				title: '活动设置',
				access_id:'',
				list: [],
				id: '',
				edit: false,
				type: ''
			}
		},
		components:{ heads },
		computed:{
			reqData(){
				var arr = []
				if(!this.edit){
					this.list.filter(item=>{
						arr.push({
							id: item.attr_id,
							price: item.act_price,
							num: item.act_num,
							pid: item.id,
						})
					})
				}
				return arr
			}
		},
		onLoad(option) {
			this.access_id = uni.getStorageSync('access_id') || this.$store.state.access_id
			this.type = option.type
			
			if(option.edit){
				console.log(uni.getStorageSync('proObject'))
				this.list= uni.getStorageSync('proObject')
				this.edit = true
				uni.removeStorageSync('proObject')
				
				if(this.type=='pt'){
					this.title="编辑拼团商品"
				}else if(this.type=='ms'){
					this.title="编辑秒杀商品"
				}
				return
			}
			
			if(this.type=='pt'){
				this.title="拼团活动设置"
			}else if(this.type=='ms'){
				this.title="秒杀活动设置"
			}
			
			this.id = option.id
			
			this.list = uni.getStorageSync('checkProList')
			
			uni.removeStorageSync('checkProList')
		},
		onShow(){
			
		},
		methods:{
			request(flag){
				
				if(this.edit){
					let data = {
						module: 'app',
						action: 'platform_activities',
						m: 'modify_pro',
						id: this.list.id,
						access_id: this.access_id,
						type: 1,
						num: this.list.num,
						price: this.list.price
					}
					this.$req.post({
						data
					}).then(res => {
						let {
							code,
							message
						} = res
						uni.showToast({
							title: message,
							icon: 'none'
						})
						if (code == 200) {
							uni.navigateBack({
								delta:1
							})
						}
					})
					return
				}
				
				let data = {
					module:'app',
					action: 'platform_activities',
					m: this.type == 'pt'?'add_pt_pro':'add_ms_pro',
					access_id: this.access_id,
					mch_id: this.$store.state.shop_id || uni.getStorageSync('shop_id'),
					id: this.id,
					data: JSON.stringify(this.reqData),
				}
				
				if(flag){
					data.audit_status = 1
				}else{
					data.audit_status = 0
				}
				console.log(data)
				// return
				let me = this;
				
				me.$nextTick(function(){
					me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
						me.$req.post({ data }).then(res=>{
							let { code, pro, message, attr } = res
							if(code==200){
								uni.showToast({
									title: '成功!',
									icon: 'none'
								})
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pagesA/myStore/activities_pro?id='+me.id
									})
								},1000)
							}else{
								uni.showToast({
									title: message?message:res.status,
									icon: 'none'
								})
							}
						})
					});
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		background-color: #F6F6F6;
		min-height: 100vh;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		
		.proBox{
			padding-left: 30rpx;background-color: #FFFFFF;margin-bottom: 20rpx;
			
			.pro{
				display: flex;align-items: center;
				padding: 30rpx 30rpx 30rpx 0;background-color: #FFFFFF;border-bottom: 1px solid #E6E6E6;
				
				.image{
					width: 120rpx;height: 120rpx;margin-right: 24rpx;
				}
				
				.proTitle{
					color: #020202;font-size: 26rpx;line-height: 26rpx;
					white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
				}
				
				.proSize{
					color: #999999;font-size: 24rpx;line-height: 24rpx;margin-top: 20rpx;
					white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
				}
				
				.priceBox{
					display: flex;align-items: center;
					margin-top: 30rpx;
					
					.price{
						color: #FF0000;font-size: 24rpx;line-height: 24rpx;font-weight: bold;
					}
					
					.size{
						color: #999999;font-size: 24rpx;line-height: 24rpx;margin-left: 60rpx;
					}
				}
			}
			
			.proIpt{
				display: flex;align-items: center;height: 80rpx;
				
				.text{
					width: 160rpx;
					color: #020202;
					font-size: 26rpx;
					text-align: right;
				}
				
				.ipt{
					flex: 1;
					font-size: 28rpx;
					padding-left: 10rpx;
				}
			}
		}
		
		.btnBox{
			position: fixed;
			bottom: 0;left: 0;right: 0;height: 98rpx;
			display: flex;
			
			.btn{
				flex: 1;height: 100%;
				display: flex;align-items: center;justify-content: center;
				background-color: #202020;
				color: #FFFFFF;
			}
		}
	}
</style>
