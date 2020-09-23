<!-- 模板页面 -->
<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<div class="yh-halfWidth" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-smfx">扫码分享</p>
					<img class='head_search' />
				</div>
			</div>
		</div>

		<!--列表 -->
		<ul class='bid_header bid_top yh-bid_top' v-if='order.length&&!load'>
			<li class="outer_li" v-for='(item,index) in order' :key="index">
				<div>用户***{{item.mobile}}</div>
				<div>{{item.grade}}</div>
				<div>{{item.add_time}}</div>
				<div>¥{{item.price}}</div>
			</li>
		</ul>

		<div class='empty_play' v-if='!order.length&&!load'>
			<img :src="emptyImg" />
			<p>暂时还没有相关的竞拍记录哦</p>
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
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				head: true, //头部切换
				access_id: '',
				order: '', //订单数据 
				bindding_id: '', //订单状态
				load: true,
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
				})
			})
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
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "auction",
					m: "record",
					id: this.bindding_id,
					access_id: this.access_id
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
				
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/templet.css");
</style>
