<!-- 提现的三种结果：审核失败，提现成功，审核中 -->
<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		
		<!-- #ifndef MP -->
		<div class="yh-halfWidth" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="order.status==2?_back():goCenter()" />
					<p class="yh-title">{{title}}</p>
					<img class='head_search' />
				</div>
			</div>
		</div>
		<!-- #endif -->


		<!-- 提现审核失败 -->
		<view class="content" v-if="order.status==2">
			<img class='fail_icon' :src="result3" />
			<view class="">
				提现申请失败
			</view>
			<view class="content_v2">
				审核失败原因
			</view>
			<view class="content_v3">
				{{order.refuse}}
			</view>
		</view>

		<!-- 提现审核成功 -->
		<view class="content" v-else-if="order.status==1">
			<img class='fail_icon' :src="result2" />
			<view class="">
				提现申请成功
			</view>
			<view class="cg_desc">
				提现金额将在3个工作日内到账，请注意查收
			</view>
			<view class="cg_items">
				<view class="cg_item">
					<view>提现银行卡</view>
					<view>{{order.bank_name}} 尾号({{order.last}})</view>
				</view>
				<view class="cg_item">
					<view>提现金额</view>
					<view>￥{{totalPrice}}</view>
				</view>
			</view>
			<view class="cg_btn" @tap="goCenter()">
				完成
			</view>
		</view>

		<!-- 提现审核中 -->
		<view class="content" v-else-if="order.status==0">
			<img class='fail_icon' :src="result1" />
			<view class="">
				提现申请审核中
			</view>
			<view class="cg_desc">
				正在审核中，请耐心等待。
			</view>
			<view class="cg_items">
				<view class="cg_item">
					<view>提现银行卡</view>
					<view>{{order.bank_name}} 尾号({{order.last}})</view>
				</view>
				<view class="cg_item">
					<view>提现金额</view>
					<view>￥{{totalPrice}}</view>
				</view>
			</view>
			<view class="cg_btn" @tap="goCenter()">
				完成
			</view>
		</view>


		<div class='load yh-load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
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

	export default {
		data() {
			return {
				fastTap: true,
				head: true, 							// 头部切换
				access_id: '',
				order: '', 								// 订单数据 
				bindding_id: '', 					// 订单状态
				load: true,
				title: '提现',
				txId: '',
				totalPrice: 0,
				result1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_status0.png',
				result2: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_status1.png',
				result3: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_status2.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				fail: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_fail.png',
			}
		},
		onLoad(options) {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.bindding_id = me.$store.state.bindding_num
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.txId = options.txId
					if (me.access_id) {
						me._axios()
					}
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
			this._axios()
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
			goCenter() {
				uni.navigateTo({
					url: './distribution_center'
				})
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this

				var data = {
					module: "app",
					action: "commcenter",
					app: 'cash_detail',
					access_id: this.access_id,
					id: me.txId
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
						me.totalPrice = res.data.res.money

						// res.data.res.money = parseInt(res.data.res.money)+parseInt(res.data.res.s_charge)
						me.order = res.data.res
						console.log(res)
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 
			 * */
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
	@import url("../../static/css/distribution/distribution_result.css");
</style>
