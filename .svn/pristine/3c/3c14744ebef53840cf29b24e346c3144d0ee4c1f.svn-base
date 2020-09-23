<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>

		<!-- 头 -->
		<div class='expressage_name'>
			<div>
				<p>物流公司：<span>{{name}}</span></p>
				<p>物流单号：{{courier_num}}
				</p>
			</div>
			<div class='copy' type="button" @tap="onCopy()">复制</div>
		</div>
		<input id='courier_num' class="courier_num_opacity" type="text" v-model="courier_num">

		<!-- 线 -->
		<div class="lines"></div>
		<!-- 物流信息 -->
		<ul v-if='expressage.length>0'>
			<template v-if='expressage.length'>
				<li v-for="(item,index) in expressage" :key="index">
					<div class='expressage_right'>
						<p>{{item.context}}<span class="expressage_phone"></span></p>
						<p class='expressage_time'>
							<span>{{item.ftime}}</span>
						</p>
					</div>
					<div class='expressage_left'>
						<div class='expressage_yuan'></div>
						<div class='expressage__xian' ref='expressage__xian'></div>
					</div>
				</li>
			</template>
			<li v-if='!expressage.length'>
				<div class='expressage_right'>
				</div>
				<div class='expressage_left'>
					<div class='expressage_yuan'></div>
					<div class='expressage__xian' ref='expressage__xian'></div>
				</div>
			</li>
		</ul>
		<div class='zwwl' v-if="!expressage.length">
			<img :src="zwwl" style='width: 200upx;height: 227upx;margin-bottom: 20upx;'>
			暂时还没有物流信息哦~
		</div>
	</div>
</template>

<script>
	// #ifdef H5
	import $ from "../../common/jquery.js"
	// #endif
	import heads from '../../components/header.vue'
	import {
		getStorage
	} from '../../common/storage'

 import { copyText } from '@/common/util.js'
	export default {
		data() {
			return {
				title: '物流信息',
				sNo: '',
				arr: new Array(5),
				access_id: '',
				courier_num: '', //快递单号
				name: '', //快递公司
				expressage: '', //物流信息
				source: '', //跳转来源
				msg: '', //提示文字
				zwwl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/zwwl.png'
			}
		},
		onLoad(option) {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			// this.sNo = option.sNo
			// this.courier_num = option.courier_num
			// this.name = option.name
			// this.source = option.source
			// this._axios()
			
			if(option.list){
				let data = JSON.parse(option.list)
				this.courier_num = data.courier_num
				this.name = data.kuaidi_name
				this.expressage = data.list||[];
				if(this.expressage.length == 0){
					this.msg = "暂无物流信息";
				}
			}
		},
		onShow() {
			this.$nextTick(function() {
				this.$refs.lktAuthorizeComp.handleAfterAuth(this, '../login/login?landing_code=1')
			});
		},
		methods: {
			changeLoginStatus() {
				this.access_id = uni.getStorageSync("access_id")
				this._axios()
			},
			/**
			 * 复制
			 * @return { undefined }
			 * */
			onCopy() {

				// #ifndef H5
				uni.setClipboardData({
					data: this.courier_num,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
							duration: 1500
						})
					}
				});
				// #endif

				// #ifdef H5
					copyText('#courier_num input',this.courier_num)
				// #endif
			},
			onError(e) {
				uni.showToast({
					title: '无法复制文本！',
					duration: 1000,
					icon: 'none'
				})
			},
			/**
			 * 加载数据
			 * @return { undefined }
			 * */
			_axios() {
				uni.showLoading({
					title: '数据加载中...'
				})

				let data = {
					module: 'app',
					action: 'order',
					app: 'logistics',
					id: this.sNo,
					access_id: this.access_id,
					type: '',
				}

				if (this.source == 1) {
					data.type = 'pond'
				}

				uni.request({
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data,
					method:'POST',
					success:(res) => {
						
						uni.hideLoading()
						if(res.data.code == 200){
							let data = res.data.res
							this.courier_num = data[0].courier_num
							this.name = data[0].kuaidi_name
							this.expressage = data[0].list||[];
							if(this.expressage.length == 0){
								this.msg = "暂无物流信息";
							}
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					fail: (e) => {
						uni.showToast({
							title: '数据加载失败！',
							duration: 2000,
							icon: 'none'
						})
					}
				})
			}
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/expressage/expressage.css");
</style>
