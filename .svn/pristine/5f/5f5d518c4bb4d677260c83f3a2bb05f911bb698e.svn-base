<!-- 模板页面 -->
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
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-wdtd">我的团队</p>
					<img class='head_search' />
				</div>
			</div>
		</div>
		<!-- #endif -->

		<view class="content">
			<!-- 第一个  开始 -->
			<view class="one" v-for='(item,index) in order' :key="index">
				<view class="item">
					<view class="em">
						<img class="my_header" :src='item.headimgurl' />
						<view class="my_name mz">
							{{item.user_name}}
						</view>
					</view>
					<view class="em">
						<view class="my_grade">分销等级：{{item.levelname}}</view>
					</view>
					<view class="em xj" @tap="_lookDetail(item.user_id,index,item.openFlag)">
						<view class="my_num">下级代理({{item.soncount}}人)</view>
						<image class='rigth_jiantou' :src="item.src" />
					</view>
				</view>
				<view class="inner_content" v-if="item.openFlag">
					<view class="inner_item" v-for='(item2,index2) in sonList' :key="index2">
						<view class="mzz">{{item2.user_name}}</view>
						<view>分销等级：{{item2.levelname}}</view>
						<view class="xjj">下级代理({{item2.soncount}}人)</view>
					</view>
				</view>
			</view>
			<!-- 第一个  结束 -->

		</view>

		<div class='empty_play' v-if='!order.length&&!load'>
			<img :src="emptyImg" />
			<p>暂时还没有下级哦</p>
		</div>
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
	import {
		lkt_seedown
	} from '../../static/js/distribution/distribution_center.js'

	export default {
		data() {
			return {
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				bottom: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_bottom.png',
				head: true, 								// 头部切换
				access_id: '',
				order: [], 									// 订单数据 
				bindding_id: '', 						// 订单状态
				load: true,
				top: '',
				sonList: [], 								// 下级的数组
				page: 0,
				loadingType: 0,
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
			/**
			 * 
			 * */
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
			_lookDetail(userId, index, openFlag) {
				lkt_seedown(userId, index, openFlag, this)
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "commcenter",
					app: 'mygroup',
					access_id: me.access_id,
					page: me.page
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log(res);
						me.load = false
						for (var i in res.data.list) {
							res.data.list[i].openFlag == false
							res.data.list[i].src = me.bottom
						}
						
						me.order = res.data.list
						
						console.log(me.order);
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
			},
			/**
			 * 
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
					action: "commcenter",
					app: 'mygroup',
					access_id: me.access_id,
					page: me.page
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
						for (var i in res.data.list) {
							res.data.list[i].openFlag == false
							res.data.list[i].src = me.bottom
						}
						if (res.data.list.length < 15) {
							me.loadingType = 2
						} else {
							me.loadingType = 0
						}
						me.order = me.order.concat(res.data.list);
					},
					error: function(err) {
						console.log(err)
					},
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_team.css");
</style>
