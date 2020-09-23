<template>
	<div class="order_ii" ref='mycoupon'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<!-- #ifndef MP -->
		<div class="yh-title">
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->

		<!-- 导航栏 -->
		<div class="yh-head" :style="{top:halfWidth1}">
			<view class="nav mycoupon_tab">
				<view class='mycoupon_li' :class='{active:type==index+1}' v-for="(item,index) in ['未使用','已使用','已过期']" :key='index'
				 @tap="_couponTitle(index+1)">{{item}}</view>
			</view>
		</div>

		<ul class='coupon_ul' :style='{paddingTop:halfWidth2}'>

			<li class="coupon" :class="item.type==0?'coupon':item.type==2||item.type==3?'coupon1':''" v-for="(item,index) in list"
			 :key='index'>
				<image v-if="item.type==0&&(item.activity_type == 4 || item.activity_type == 5)" class="vip_img" :src="vipImg"></image>
				<view class="coupon_top" :class="item.type==2||item.type==3?'coupon_top2':''">
					<view class="coupon_top_left">
						<view>
							<span class="yh-product_title">
								{{item.name?item.name:item.product_title}}
							</span>
							<span v-if="item.type==0" class="coupon_top_icon">{{item.activity_type==1?'免邮券':item.activity_type==2?'满减券':item.activity_type==3?'折扣券':''}}</span>
						</view>
						<span>{{item.expiry_time}} 到期</span>
					</view>
					<!--  免邮 -->
					<view v-if="item.activity_type==1" class="coupon_top_right" :style="item.type==0?'':item.type==2?'background: url(' + beenuseimg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':item.type==3?'background: url(' + couponTimeImg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':''">
						<view><span class="yh-by">包邮</span></view>
						<span>{{item.limit}}</span>
					</view>
					<!--  满减 -->
					<view v-if="item.activity_type==2" class="coupon_top_right" :style="item.type==0?'':item.type==2?'background: url(' + beenuseimg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':item.type==3?'background: url(' + couponTimeImg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':''">
						<view>￥<span class="yh-by">{{item.money}}</span></view>
						<span>{{item.limit}}</span>
					</view>
					<!-- 折扣 -->
					<view v-else-if="item.activity_type==3" class="coupon_top_right" :style="item.type==0?'':item.type==2?'background: url(' + beenuseimg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':item.type==3?'background: url(' + couponTimeImg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221);':''">
						<view><span class="yh-by">{{item.discount}}</span>折</view>
						<span>{{item.limit}}</span>
					</view>
					<!-- 会员专享 -->
					<view v-else-if="item.activity_type==4" class="coupon_top_right" :style="item.activity_type==4?'background: url('+ bg1img +') no-repeat top right/138upx 138upx;':item.type==2?'background: url(' + beenuseimg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221)':item.type==3?'background: url(' + couponTimeImg + ') no-repeat top right/88upx 88upx;border-color:rgb(221, 221, 221);':''">
					</view>
				</view>
				<view class="coupon_bottom">
					<view class="coupon_bottom_left" @tap="discTap(index)">
						<view class="coupon_bottom_l">
							使用说明
							<image v-if="item.discFlag" :src="discFlagtopimg" class="yh-discFlag"></image>
							<image v-else :src="discFlagbottomimg" class="yh-discFlag"></image>
						</view>
					</view>
					<view v-if="item.type==0" class="coupon_bottom_right" @tap='_use(item.point,item.id,item.url)'>
						立即使用
					</view>
					<view v-else-if="item.type==2" class="coupon_bottom_right yh-coupon_bottom_right">
						已使用
					</view>
					<view v-else-if="item.type==3" class="coupon_bottom_right yh-coupon_bottom_right">
						已过期
					</view>
					<view v-if="item.discFlag" class="coupon_bottom_b">
						<text class="yh-Instructions">{{item.Instructions}}</text>
					</view>
				</view>
			</li>

			<li v-if='list && list.length==0' class='emtpy_dis'>
				<div class='noFindDiv'>
					<div>
						<img :src="noCoupon" class='noFindImg' alt="">
					</div>
					<span class='noFindText'>目前没有优惠券哦~</span>
				</div>
			</li>
		</ul>

		<div v-if='loopStatu' class='mycoupon_bottom' @tap="_couponcenter()">
			<span>去领更多券</span>
		</div>

		<div class='complete complete_b' v-if='complete_report' :style="{top:halfWidth}">
			<div class='complete_qiandao'>
				<img class='complete_img' :src="close" @click="_closeexplain" />
				<p class="yh-yhjsm">优惠券使用说明</p>
				<p>1、购买商品时（除特例商品外），优惠券可抵扣相应现金价值;</p>
				<p>2、单个订单只能使用一张优惠券，且不得与其它优惠方式同时使用;</p>
				<p>3、本券不得兑换现金不设找零;</p>
				<p>4、退货时，本券价值不予退还;</p>
			</div>
		</div>

	</div>
</template>

<script>
	import heads from '../../components/header.vue'

	import {
		getStorage
	} from '../../common/storage'
	export default {
		data() {
			return {
				title: '我的优惠券',
				noCoupon: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noCoupon.png',
				huiquan: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/huiquan2x.png',
				kong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kong2x.png',
				back: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				close: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/qiandaoguanbi2x.png',
				coupon_bg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/coupon_bg.png',
				coupon_us: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/coupon_us.png',
				coupon_out: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/coupon_out.png',
				vipImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/vip.png",
				beenuseimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/beenuse.png",
				couponTimeImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/coupon_time.png",
				bg1img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/bg_1.png",
				discFlagtopimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/top.png",
				discFlagbottomimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/bottom.png",
				list: false,
				list1: '',
				list2: '',
				list3: '',
				type: 1,
				display: '',
				complete_report: false,
				loopStatu: true,
			}
		},
		onLoad(option) {
			if (option.loop) {
				this.loopStatu = false
			}
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2

				return uni.upx2px(he) + 'px';
			},
			halfWidth1: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				
				// #ifdef H5
				he = 88
				// #endif
				
				return uni.upx2px(he) + 'px';
			},
			halfWidth2: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2 + 51
				
				// #ifdef MP-WEIXIN
				he = 100
				// #endif
				
				// #ifdef H5
				he = 100
				// #endif
				
				return uni.upx2px(he) + 'px';
			},
		},
		onShow() {
			let me = this;
			me.$nextTick(function() {
				
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				
				if (!me.list) {
					uni.showLoading({
						title: '加载中...',
						mask: true,
					})
				}
				
				if (me.access_id) {
					me._axios()
				}
				
			})
		},
		components: {
			heads
		},
		methods: {
			/**
			 * 
			 * */
			_uni_back() {
				if (this.frompage == 'my') {
					uni.switchTab({
						url: '../tabBar/my'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			/**
			 * 
			 * */
			_couponcenter() {
				uni.navigateTo({
					url: '../../pagesA/shop/coupon?loop=false'
				})
			},
			/**
			 * 
			 * */
			_uni_navigateTo(url) {
				uni.navigateTo({
					url,
				})
			},
			/**
			 * 
			 * */
			_uni_navigateTo1(url) {
				if (this.access_id) {
					uni.navigateTo({
						url,
					})
				} else {
					uni.showToast({
						title: '未登录,请先登录',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			/**
			 * 
			 * */
			_explain() {
				this.complete_report = true
			},
			/**
			 * 
			 * */
			_closeexplain() {
				this.complete_report = false
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'Coupon',
					app: 'mycoupon',
					access_id: this.access_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						uni.hideLoading();
						if (res.data.code == 200) {
							let {
								data: {
									list1,
									list2,
									list3
								}
							} = res
							me.list1 = list1
							me.list2 = list2
							me.list3 = list3
							if (me.type == 1) {
								me.list = list1
							} else if (me.type == 2) {
								me.list = list2
							} else if (me.type == 3) {
								me.list = list3
							}
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					}
				})
			},
			/**
			 * 
			 * */
			_couponTitle(type) {
				this.type = type
				if (type == 1) {
					this.list = this.list1
				} else if (type == 2) {
					this.list = this.list2
				} else if (type == 3) {
					this.list = this.list3
				}
			},
			/**
			 * 
			 * */
			_use(value, id, url) {
				if (url.indexOf('tabBar') > 0) {
					uni.switchTab({
						url: url
					});
				} else {
					uni.navigateTo({
						url: url
					});
				}
			},
			/**
			 * 
			 * */
			discTap(e) {
				this.$set(this.list[e], 'discFlag', !this.list[e].discFlag)
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/my/mycoupon.css");
</style>
