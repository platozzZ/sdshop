<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<view class="container_top">
			<heads :title='title' returnR="4"></heads>

			<view class="tab">
				<view class="li" :class="{active: tabIndex==0}" @tap="tabIndex=0">商品列表</view>
				<view class="li" :class="{active: tabIndex==1}" @tap="tabIndex=1">待审核商品</view>
			</view>
		</view>
		
		<toload :load="load">
			<view class="pro" v-for="(item,index) in list" :key="index">
				<view class="pro_top">
					<image class="image" :src="item.img"></image>
					<view class="pro_top_right">
						<view class="proTitle" :style="tabIndex==1?'display: block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;':''">
							{{item.group_title}}
						</view>
						<view class="proSize">规格：{{item.names}}</view>
						<view class="proPrice" :style="tabIndex==1?'margin-top: 20rpx':''">
							<view class="red">￥{{item.price}}</view>
							<view>库存：{{item.num}}</view>
						</view>
						<view v-if="tabIndex==1" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 28rpx;line-height: 28rpx;color:#FF0000;margin-top: 12rpx">
							{{item.audit_status==0?'待提交审核':item.audit_status==1?'审核中':('审核失败：'+item.reason)}}
						</view>
					</view>
				</view>
				<view class="pro_bottom" v-if="item.g_status==1">
					<view class="btn" v-if="item.audit_status!=1" @tap="delPro(item)">删除商品</view>
					<view class="btn" v-if="item.audit_status==1" @tap="reqSH(item,0)">撤销审核</view>

					
					<view class="btn" @tap="toEdit(item)" v-if="item.audit_status!=1">编辑商品</view>
					<view class="btn" v-if="item.audit_status==0" @tap="reqSH(item,1)">提交审核</view>
				</view>
			</view>
		</toload>
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	export default {
		data() {
			return {
				load: false,
				title: '活动商品',
				access_id: '',
				id: '',
				list: [],
				tabIndex: 0,
				type: ''
			}
		},
		watch: {
			tabIndex(val) {
				this.load = false
				this.axios()
			}
		},
		components: {
			heads,
			toload
		},
		onLoad(option) {
			this.id = option.id
			this.type = option.type
			
			if(this.type=='pt'){
				this.title="拼团活动商品"
			}else if(this.type=='ms'){
				this.title="秒杀活动商品"
			}
		},
		onShow() {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.axios();
				});
			});
		},
		methods: {
			delPro(pro){
				let data = {
					module: 'app',
					action: 'platform_activities',
					m: 'del_pro',
					id: pro.id,
					access_id: this.access_id,
				}
				this.$req.post({
					data
				}).then(res => {
					let {
						code,
						pro,
						message
					} = res
					uni.showToast({
						title: message,
						icon: 'none'
					})
					if (code == 200) {
						this.axios()
					}
				})
			},
			reqSH(pro, type) {
				let data = {
					module: 'app',
					action: 'platform_activities',
					m: 'modify_pro',
					id: pro.id,
					access_id: this.access_id,
					type
				}
				this.$req.post({
					data
				}).then(res => {
					let {
						code,
						pro,
						message
					} = res
					uni.showToast({
						title: message,
						icon: 'none'
					})
					if (code == 200) {
						this.axios()
					}
				})
			},
			toEdit(pro) {
				uni.setStorageSync('proObject', pro)
				uni.navigateTo({
					url: '/pagesA/myStore/activities_set?edit=true&type='+this.type
				})
			},
			axios() {
				let data = {
					module: 'app',
					action: 'platform_activities',
					m: 'pro_list',
					id: this.id,
					type: this.tabIndex,
					access_id: this.access_id,
					mch_id: this.$store.state.shop_id ? this.$store.state.shop_id : uni.getStorageSync('shop_id')
				}
				
				this.$req.post({
					data
				}).then(res => {
					let {
						code,
						pro,
						message
					} = res
					if (code == 200) {
						setTimeout(() => {
							this.load = true
						},600)
						this.list = pro
					} else {
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
	.container {
		background-color: #F6F6F6;
		min-height: 100vh;

		&_top {
			position: sticky;
			z-index: 9999;
			top: 0;

			.tab {
				display: flex;
				background-color: #FFFFFF;

				.li {
					flex: 1;
					height: 90rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 30rpx;
					color: #999999;
					border-bottom: 1px solid #EEEEEE;
				}

				.active {
					position: relative;
					color: #242424;
					font-weight: bold;
				}

				.active:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 150rpx;
					height: 2px;
					background-color: #242424;
				}
			}
		}

		.pro {
			padding-left: 30rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;

			&_top {
				display: flex;
				padding: 30rpx 0;
				border-bottom: 1px solid #E6E6E6;

				.image {
					width: 160rpx;
					height: 160rpx;
					margin-right: 22rpx;
				}

				&_right {
					flex: 1;
					overflow: hidden;
					padding-right: 20rpx;

					.proTitle {
						font-size: 26rpx;
						line-height: 30rpx;
						color: #020202;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.proSize {
						color: #999999;
						font-size: 24rpx;
						line-height: 24rpx;
						margin-top: 20rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.proPrice {
						display: flex;
						align-items: center;
						margin-top: 34rpx;
						color: #666666;
						font-size: 24rpx;
						line-height: 24rpx;

						.red {
							color: #FF0000;
							font-weight: bold;
							margin-right: 40rpx;
						}
					}
				}
			}

			&_bottom {
				display: flex;
				height: 80rpx;
				align-items: center;
				justify-content: flex-end;
				padding-right: 10rpx;

				.btn {
					width: 140rpx;
					height: 50rpx;
					border: 1px solid rgba(184, 184, 184, 1);
					border-radius: 6rpx;
					margin-right: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
