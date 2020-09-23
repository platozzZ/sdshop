<!-- 分销中心 -->
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
					<img class='head_img' :src="back2" @tap="_back()" />
					<p class="yh-dlzx">代理中心</p>
				</div>
			</div>
		</div>
		<div class="yh-mp"></div>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="wei_gz yh-wei_gz" @tap="_navigator('./distribution_rule')">
			<view>代理规则</view>
			<img class='wen_img' :src="hei_wen" />
		</view>
		<!-- #endif -->

		<!-- 已经是分销商了的 -->
		<div v-if="is_distribution==1">

			<view class="center_top">
				<view class="c_t_c">
					<img class="bg_img" mode="aspectFill" :src="centerBg" />
					<view class="ctc_top">
						<img class='myheader_img' mode='aspectFill' :src="order.headimgurl" />
						<view class="ctx_middle">
							<view class="mid_1">
								<view>{{order.user_name}}</view>
								<view>{{order.levelname}}</view>
							</view>
							<view class="mid_2">
								推荐人：{{order.pidname}}
							</view>
						</view>
						<view class="ctc_right" @tap="_navigator('./distribution_share')">
							<img class="c_right_img" mode="aspectFill" :src="erwm" />
							<view>扫码分享</view>
						</view>
					</view>
					<view class="ctc_bottom">
						<view class="bottom_item">
							<view>{{order.comm1||0}}</view>
							<view>预计佣金</view>
						</view>
						<view class="bottom_item">
							<view>{{order.comm3||0}}</view>
							<view>可提现佣金</view>
						</view>
						<view class="bottom_item">
							<view>{{order.comm2||0}}</view>
							<view>累计佣金</view>
						</view>
					</view>
				</view>
				<view class="c_btns">
					<view @tap="_navigator('./distribution_list')">分销商城</view>
					<view @tap="supply()">佣金提现</view>
				</view>
				<view class="c_three">
					<view class="three_one" @tap="_navigator('./distribution_team')">
						<img class="one1" mode="aspectFill" :src="three1" />
						<view>我的团队</view>
					</view>
					<view class="three_one" @tap="_navigator('./distribution_flow')">
						<img class="one2" mode="aspectFill" :src="three2" />
						<view>佣金明细</view>
					</view>
					<view class="three_one" @tap="_navigator('./distribution_tocashFlow')">
						<img class="one3" mode="aspectFill" :src="three3" />
						<view>提现明细</view>
					</view>
				</view>
			</view>
		</div>

		<!-- 还不是分销商的 -->
		<div v-else-if="is_distribution==0">
			<view class="noSupply">
				<img class="no_img" :src='noSupply' />
				<view class="">
					您暂无权限请升级成为代理
				</view>
				<view class="beproxy" @tap="_navigator('./distribution_list')">
					立即升级成为代理
				</view>
			</view>
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

	export default {
		data() {
			return {
				fastTap: true,
				head: true,							// 头部切换
				access_id: '',
				order: '', 							// 订单数据 
				bindding_id: '', 				// 订单状态
				load: true,
				tixian_id: -1,
				wenhao2: '',
				is_distribution: null,  // 是否是分销商？1是，0不是
				centerBg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'bg_black.png',
				three1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_td.png',
				three2: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_zfmx.png',
				three3: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_order.png',
				noSupply: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/' + 'fx_sq.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_whiteJT.png',
				back2: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				wenhao: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_wenhao.png',
				hei_wen: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_heiwenhao.png',
				erwm: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_erwm.png',
			}
		},

		onLoad() {
			
			let me = this
			
			me.bindding_id = me.$store.state.bindding_num
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					
				})
			})
			
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				
				// #ifdef MP
				heigh = 0
				// #endif
				
				return heigh + 'px';
			},
		},

		onShow() {
			this.bindding_id = this.$store.state.bindding_num
			var me = this;
			this.status_id = this.$store.state.head_id
			
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			me._axios();
			
			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231)
				});
			});
			
			p.then(() => {
				me.$nextTick(function() {
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
						
					});
				});
			})
			
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
			 * 返回
			 * */
			_back() {
				uni.switchTab({
					url: '../../pages/tabBar/my'
				})
			},
			/**
			 * 
			 * */
			supply() {
				if (this.tixian_id > 0) {
					uni.showToast({
						title: '您还有一笔正在审核中的提现记录！',
						icon: 'none',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: './distribution_form'
					})
				}
			},
			/**
			 * 
			 * */
			_navigator(url) {
				uni.navigateTo({
					url: url
				})
			},
			/**
			 * 获取数据
			 * */
			_axios() {
				let data = {
					module: "app",
					action: "commcenter",
					app: 'index',
					access_id: this.access_id
				}
				
				this.$req.post({ data }).then(res => {
					
					if (res.code == 404) {
						this.$refs.lktAuthorizeComp.handleAfterAuth(this, '../../pages/login/login?landing_code=1')
					} else {
						
						this.load = false
						this.order = res.data
						this.is_distribution = res.data.is_distribution
						this.tixian_id = res.data.tixian_id
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_center.css");
</style>
