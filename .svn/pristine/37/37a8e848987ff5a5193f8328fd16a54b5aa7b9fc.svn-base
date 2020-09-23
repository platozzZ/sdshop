<!-- 分销商品展示 -->
<template>
	<div class="yh-distr">

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
					<p class="yh-dlsc">代理商城</p>
					<img class='head_search' />
				</div>
			</div>
		</div>
		<!-- #endif -->

		<view class="content">

			<!-- #ifdef MP -->
			<ul class='order_header'>
				<li class='header_li' :class="{header_border:status_id==item.id}" v-for='(item,index) in header' :key='item.id'
				 @tap="_header_index(item.id)">{{item.levelname}}</li>
			</ul>
			<!-- #endif -->

			<!-- #ifndef MP -->
			<ul class='order_header yh-order_header'>
				<li class='header_li' :class="{header_border:status_id==item.id}" v-for='(item,index) in header' :key='item.id'
				 @tap="_header_index(item.id)">{{item.levelname}}</li>
			</ul>
			<!-- #endif -->

		</view>

		<div>
			<ul class='allgoods yh-allgoods'>
				<li @tap="_goods(item.id)" class="allgoods_li" v-for='(item,index) in order' :key="index">
					<img :src="item.imgurl" />
					<p class="allgoods_name">{{item.name}}</p>
					<p class='allgoods_p'>{{item.subtitle}} </p>
					<div>
						<span class="yh-span">
							<span class="yh-span-a">￥</span>
							<span class="yh-span-b">{{item.price_yh}}</span>
						</span>
						<!-- <img style="width: 34upx;height: 34upx;margin-right: 20upx;" :src="shopImg" /> -->
					</div>
				</li>
			</ul>
			<div v-if="hasGoods==-1" class="yh-hasGoods" :style="{top:halfWidth}">
				
				<div class="search_no yh-search_no">
					<div class="font_14 yh-font_14">
						<img class="yh-font-img" :src="emptyImg">
					</div>
					<span class="yh-sp-color">该等级暂时没有商品！</span>
				</div>
				
			</div>
		</div>
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
	import {
		lkt_getgrade
	} from '../../static/js/distribution/distribution_center.js'

	export default {
		data() {
			return {
				mask_display: false,
				fastTap: true,
				head: true, 								// 头部切换
				access_id: '',
				order: '', 									// 订单数据 
				bindding_id: '', 						// 订单状态
				load: true,
				header: [],
				status_id: '', 							// nav的选择
				numb: 1, 										// 规格选择的数量
				ys_price: '', 							// 规格初始价格
				num: '', 										// 规格数量
				price: '', 									// 规格价格
				hasGoods: 1,
				page: 1,
				loadingType: 0,
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jian2x.png',
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jianhui2x.png',
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jia+2x.png',
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/add+2x.png',
				closed: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/guanbi2x.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				shopImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/shopping_l2x.png'
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
			if (this.status_id) {
				this._axios()
			} else {
				this._grade()
			}
		},

		methods: {
			/**
			 * 
			 * */
			...mapMutations({
				pro_id: 'SET_PRO_ID',
			}),
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
			_header_index(id) {
				this.status_id = id
				this.page = 1
				this.loadingType = 0
				this._axios()
			},
			/**
			 * 
			 * */
			_grade() {
				lkt_getgrade(this)
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "commproduct",
					access_id: me.access_id,
					app: 'listdetail',
					distributor_id: me.status_id,
					page: me.page,
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
						me.order = res.data.pro
						if (res.data.code == 102) {
							me.hasGoods = -1
						} else {
							me.hasGoods = 1
						}
						console.log("res")
						console.log(res)
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 跳转商品详情页
			 * */
			_goods(id) {
				console.log("id+" + id)
				this.pro_id(id)
				uni.navigateTo({
					url: '../../pages/goods/goodsDetailed?isDistribution=true&productId=' + id
				});
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
			/**
			 * 跳转商品详情页
			 * */
			onReachBottom() {
				var me = this
				if (me.loadingType != 0) {
					return;
				}
				me.loadingType = 1;
				me.page = me.page + 1
				var data = {
					module: "app",
					action: "commproduct	",
					access_id: me.access_id,
					app: 'listdetail',
					distributor_id: me.status_id,
					page: me.page,
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
						if (res.data.pro.length < 10) {
							me.loadingType = 2
						} else {
							me.loadingType = 0
						}
						me.order = me.order.concat(res.data.pro);
					},
					error: function(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_list.css");
</style>
