<template>
	<div class='us-all'>
		
		<!-- #ifndef MP -->
		<div class="yh-title">
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		
		<div v-if='content' class="logo" :style="{top:halfWidth}">
			<rich-text class="richtext yh-richtext" :nodes="content"></rich-text>
		</div>
		
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import htmlParser from '@/common/html-parser.js'

	export default {
		data() {
			return {
				title: '代理规则',
				log: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/15306155488.png',
				content: '',
				access_id: '',
			}
		},
		onLoad() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			let me = this
			uni.showLoading({
				title: '加载中'
			})
			
			uni.request({
				data: {
					module: "app",
					action: "commcenter",
					app: 'index',
					access_id: this.access_id
				},
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					uni.hideLoading();
					console.log("规则")
					console.log(res)
					console.log(res.data.content)
					if (res.data.code == 200) {
						me.content = htmlParser(res.data.data.content);
					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					}
					console.log(res)

				}
			})

		},
		components: {
			Heads
		},
		computed: {
			halfWidth() {
				var gru = this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_rule.css");
</style>
