<template>
	<div>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<!-- #ifndef MP -->
		<div class="yh-ifndefMP" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p style="font-size: 32upx;">出价记录</p>
					<img class='head_search' />
				</div>
				<!--   导航栏      -->
				<ul class='bid_header' v-if='order.length&&!load'>
					<li class="outer_li">
						<div>用户</div>
						<div style="margin-left: -10upx!important;">状态</div>
						<div>时间</div>
						<div style="padding-right: 10upx;">竞拍价</div>
					</li>
				</ul>
			</div>
		</div>
		<div style="height: 172upx;width: 100%;"></div>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<div style="height: 89upx;width: 100%;"></div>
		<div class="yh-ifdefMP" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<!--   导航栏      -->
				<ul class='bid_header' v-if='order.length&&!load'>
					<li class="outer_li">
						<div>用户</div>
						<div style="margin-left: -10upx!important;">状态</div>
						<div>时间</div>
						<div style="padding-right: 10upx;">竞拍价</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- #endif -->

		<!--列表 -->
		<ul class='bid_header bid_top' v-if='order.length&&!load'>
			<li class="outer_li" v-for='(item,index) in order' :key="index">
				<div class="user_name_long">{{item.user_name}}</div>
				<div v-if="index == 0">领先</div>
				<div v-else>出局</div>
				<div>{{item.add_time}}</div>
				<div style="width: 18%;text-align: center;">{{item.price}}</div>
			</li>
		</ul>

		<div class='empty_play' v-if='!order.length&&!load'>
			<img :src="emptyImg" />
			<p>暂时还没有相关的竞拍记录哦</p>
			<!-- <p class='empty_p'>可以去看看有那些想买的</p>
			<div @tap="_toHome()">去商城逛逛</div> -->
		</div>
		<div class='load' v-if='load' style="height: 60vh;">
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
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg9@2x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				head: true, //头部切换
				access_id: '',
				order: '', //订单数据 
				bindding_id: '', //订单状态
				load: true,
			}
		},
		// 		
		onLoad() {
			this.bindding_id = this.$store.state.bindding_num
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		// 	
		onShow() {
			this.bindding_id = this.$store.state.bindding_num
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()
		},

		methods: {
			/**
			 * @description 获取请求
			 * */
			_axios() {
				var me = this

				var data = {
					module: "app",
					action: "auction",
					m: "record",
					id: this.bindding_id,
					access_id: this.access_id
				}

				this.$req.post({
					data
				}).then(ress => {
					let {
						res
					} = ress

					me.load = false


					if (res.length > 0) {
						for (var i in res) {
							if (i == 0) {
								res[i].grade = '领先'
							} else {
								res[i].grade = '出局'
							}
						}
					}
					me.order = res
				})
				
			},
			/**
			 * 返回
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
	@import url("../../static/css/bidding/bidding_record.css");
</style>
