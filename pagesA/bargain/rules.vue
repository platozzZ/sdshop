<template>
	<div>
		
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		
		<!-- #ifndef MP -->
		<div class="yh-ifndef-mp" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-head-p">砍价规则</p>
					<img class='head_search' />
				</div>
				
			</div>
		</div>
		<!-- #endif -->
		
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>
		
		<div class="yh-head-top"></div>
		
		<div class="rule_list">
			<wxParse :content='my_rule' v-if='my_rule'></wxParse>
		</div>
		
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	
	import {
		getStorage
	} from '@/common/storage'
	
	import uniLoadMore from "@/components/uni-load-more.vue"
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	
	export default {
		data() {
			return {
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				jp_rule: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jp_rule.png',
				head: true, 	// 头部切换	
				order: '', 		// 订单数据 
				my_rule: '' ,	// 砍价规则
				access_id: '',
				load: true,
			}
		},
		onLoad() {
			this.status_id = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		components: {
			wxParse
		},
		methods: {
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				bindding_num: "SET_BINDDING_NUM",
				bind_status: 'SET_BIND_STATUS',
				bind_promise: "SET_BIND_PPOMISE",
				head_id: "SET_HEAD_ID"
			}),
			/**
			 * 返回首页
			 * */
			_toHome() {
				uni.switchTab({
					url: '../tabBar/home'
				})
			},
			/**
			 * 
			 * */
			_navigateTo(status, id) {
				if (status == 0) {
					uni.navigateTo({
						url: 'order?order_id=' + id + '&showPay=true',
					})
				} else {
					uni.navigateTo({
						url: 'order?order_id=' + id,
					})
				}

				this.flag = false
			},
			/**
			 * 返回
			 * */
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 加载数据
			 * */
			_axios() {
				
				let data = {
					m: 'getRule',
					action: 'bargain',
					module: 'app'
				}
				
				this.$req.post({ data }).then(res => {
					this.my_rule = res.rule
					this.load = false
				})
				
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/bargain/rules.css");
</style>
