<!-- 佣金明细列表 -->
<template>
	<div>
		
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		
		<!-- #ifndef MP-WEIXIN -->
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #endif -->
		
		<!-- #ifndef MP -->
		<div class="yh-halfWidth" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-yjmx">佣金明细</p>
					<img class='head_search' />
				</div>
			</div>
		</div>
		<!-- #endif -->
		
		<view class="content">
			<view class="c_top">
				<view class="">
					总佣金
				</view>
				<view class="">
					+{{total||0}}元
				</view>
			</view>
			<!-- 有记录的时候 -->
			<view class="c_bottom">
				<view class="c_b_item" v-for="(item,index) in order">
					<view class="item_flex">
						<view class="sty1">{{item.from_user}}</view>
						<view class="sty2">+{{item.money}}</view>
					</view>
					<view class="item_flex">
						<view class="sty3">{{item.add_date}}</view>
						<view class="sty4">发放状态：{{item.status}}</view>
					</view>
				</view>
				<uni-load-more v-if='order.length>10' :loadingType="loadingType"></uni-load-more>
			</view>
			
			<!-- 没有记录的时候 -->
			<div class='empty_play' v-if='!hasFlag&&!load'>
				<img :src="emptyImg" />
				<p>您还没有相关记录~</p>
			</div>
		</view>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'
	import uniLoadMore from "@/components/uni-load-more.vue"

	export default {
		data() {
			return {
				fastTap: true,
				head: true, 								// 头部切换
				access_id: '',
				order: '', 									// 订单数据 
				bindding_id: '', 						// 订单状态
				load: true,
				hasFlag: '', 								// 是否有佣金明细
				total: 0,
				page: 0,
				loadingType: 0,
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_nodata1.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
			}
		},
		onReachBottom() {
			var me = this
			if (this.loadingType != 0) {
				return;
			}
			this.loadingType = 1;
			var data = {
				module: "app",
				action: "commcenter",
				app: 'comm_list',
				access_id: this.access_id,
				page: this.page
			}
			
			if (this.order.length > 0) {
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						// let {data: {data}} = res.data.list
						let data = res.data.list
						console.log(data)
						me.page += 1
						if (res.data.code == 200) {
							me.order = me.order.concat(data);
							me.loadingType = 0;
						} else {
							me.loadingType = 2;
						}
					},
					error: (err) => {
						console.log(err)
					}
				})
			}
		},
		onLoad() {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					
				});
			});
			
			me.bindding_id = me.$store.state.bindding_num
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},

		onShow() {
			this.bindding_id = this.$store.state.bindding_num
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()
		},

		methods: {
			...mapMutations({}),
			/**
			 * 
			 * */
			changeLoginStatus() {
				this.access_id = uni.getStorageSync('access_id');
				this._axios();
			},
			/**
			 * 获取数据
			 * */
			_axios() {
				
				let data = {
					module: "app",
					action: "commcenter",
					app: 'comm_list',
					access_id: this.access_id,
					page: this.page
				}
				
				this.$req.post({ data }).then(res => {
					
					console.log(res,1111)
					
					this.load = false
					
					if (res.code == 103) {
						
						if (this.page > 0) {
							this.hasFlag = true
						} else {
							this.hasFlag = false
						}
						
					} else if (res.code == 200) {
						
						this.hasFlag = true
						this.order = res.list
						this.total = res.total
						this.page = 1
					}
				})
			},
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_flow.css");
</style>
