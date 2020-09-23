<!-- 模板页面 -->
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
					<p class="yh-txmx">提现明细</p>
					<img class='head_search' />
				</div>
			</div>
		</div>
		<!-- #endif -->

		<view class="content">
			
			<view class="c_top">
				<view>累计提现佣金</view>
				<view>+{{total||0}}元</view>
			</view>

			<view class="c_nav">
				<!--   导航栏      -->
				<ul class='order_header'>
					<li class='header_li' :class="{header_border:status_id==index}" v-for='(item,index) in header' :key='item.id' @tap="_header_index(index)">{{item}}</li>
				</ul>
			</view>

			<!-- 有记录的情况 -->
			<view class="c_content" v-if='hasFlag'>
				<!-- <view class="today">
					{{today}}（今天）
				</view> -->
				<view class="c_b_item" v-for="(item,index) in order" @tap="_goXQ(item.id)" :key="index">
					<view class="item_flex">
						<view class="sty1">提现</view>
						<view class="sty2">-{{item.money}}</view>
					</view>
					<view class="item_flex">
						<view class="sty3">{{item.add_date}}</view>
						<view class="sty4">{{statusStr[item.status]}}</view>
					</view>
				</view>
				
				<uni-load-more v-if='order.length>10' :loadingType="loadingType"></uni-load-more>
				<!-- <view class="noMore">没有更多了</view> -->
			</view>
			<!-- 没有记录的情况 -->
			<div class='empty_play' v-if='!hasFlag&&!load'>
				<img :src="emptyImg" />
				<p class="yh-emp">您还没有任何记录~</p>
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
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				head: true, 						// 头部切换
				access_id: '',
				order: '', 							// 订单数据 
				bindding_id: '', 				// 订单状态
				load: true,
				header: ['全部', '待审核', '审核通过', '审核失败'],
				status_id: '', 					// 状态
				today: '0000-00-00',
				statusStr: ['审核中', '审核成功', '审核失败'],
				hasFlag: '',
				page: 0,
				total: 0, 							// 预计佣金
				loadingType: 0,
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_tixNo.png',
				title: '提现明细',
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
				app: 'cash_list',
				access_id: this.access_id,
				page: this.page,
				status: me.status_id
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
					me.bindding_id = me.$store.state.bindding_num
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					if (me.access_id) {
						me._axios()
					}
					me._getToday();
				});
			});

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
			// this._axios()
		},

		methods: {
			...mapMutations({}),
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			/**
			 * 
			 * */
			_goXQ(id) {
				this.page = 0
				uni.navigateTo({
					url: './distribution_result?txId=' + id
				})
			},
			/**
			 * 
			 * */
			_header_index(index) {
				this.status_id = index
				this.page = 0
				this._axios()
			},
			/**
			 * 
			 * */
			_getToday() {
				var myDate = new Date();
				this.today = myDate.getFullYear() + "-" + (parseInt(myDate.getMonth()) + 1) + '-' + myDate.getDate();
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				console.log(this.bind_st)
				var data = {
					module: "app",
					action: "commcenter",
					app: 'cash_list',
					access_id: this.access_id,
					page: this.page,
					status: me.status_id
				}

				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {

						me.load = false

						if (res.data.code == 103) {
							me.hasFlag = false
						} else if (res.data.code == 200) {
							me.hasFlag = true
							me.order = res.data.list
							me.total = res.data.total
							me.page = 1
						}
						console.log(res.data.list)
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 
			 * */
			onReachBottom: function() {
				var me = this
				if (this.loadingType != 0) {
					return;
				}
				this.loadingType = 1;
				console.log(this.page)
				var data = {
					module: 'app',
					action: 'index',
					app: 'get_more',
					page: this.page,
				}
				console.log(data)
				if (this.goods_like.length > 0) {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							console.log(res)
							let {
								data: {
									data
								}
							} = res
							console.log(data)
							me.page += 1
							if (data.length > 0) {
								me.goods_like = me.goods_like.concat(data);
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
			/**
			 * 
			 * */
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_tocashFlow.css");
</style>
