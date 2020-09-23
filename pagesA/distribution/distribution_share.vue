<!-- 扫码分享 -->
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
					<p class="yh-smfx">扫码分享</p>
					
					<!-- #ifndef H5 -->
					<p class="saveClass" @tap="_saveImg()">保存</p>
					<!-- #endif -->
					
					<!-- #ifdef H5 -->
					<p class="saveClass"></p>
					<!-- #endif -->
					
				</div>
			</div>
		</div>
		<!-- #endif -->
		
		<div class="yh-ewm">
			<img v-if="ewmImg" class="yh-ewmImg" :src="ewmImg" @longpress='shibieImg()'>
		</div>
		
	</div>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue"
	
	import {
		mapMutations
	} from 'vuex'
	
	import {
		getStorage
	} from '../../common/storage'
	
	import {
		lkt_saveimg,
		lkt_getimg
	} from '../../static/js/distribution/distribution_center.js'

	export default {
		data() {
			return {
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				head: true, 								// 头部切换
				access_id: '',
				order: '', 									// 订单数据 
				bindding_id: '', 						// 订单状态
				load: true,
				ewmImg: '',
				user_id: ''
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
			_saveImg() {
				lkt_saveimg(this)
			},
			/**
			 * 
			 * */
			shibieImg() {

			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				wx.showLoading({
					title: '请等待片刻...'
				})
				me._shareImg()
			},
			/**
			 * 
			 * */
			_shareImg() {
				lkt_getimg(this)
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
	@import url("../../static/css/distribution/distribution_share.css");
</style>
